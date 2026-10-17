import { fireEvent, render, screen, within } from '@testing-library/react';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { R4Recipe, R6Recipe } from './r4-r6';

const businessCallbacks = vi.hoisted(() => ({ save: vi.fn<(label: string) => void>() }));

// Observe the actual application's only save entry points. Every other UI export,
// the Button implementation, the business callbacks and Layout remain real.
vi.mock('@rain-next/ui', async importOriginal => {
  const actual = await importOriginal<typeof import('@rain-next/ui')>();
  const { createElement, forwardRef } = await import('react');
  const saveLabels = new Set(['本地保存草稿', '本地保存示例', '完成预览']);
  const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof actual.Button>>(
    function ObservedBusinessButton(props, ref) {
      const label = typeof props.children === 'string' ? props.children : null;
      const callback = props.onClick;
      if (!label || !saveLabels.has(label) || !callback) return createElement(actual.Button, { ...props, ref });
      return createElement(actual.Button, {
        ...props,
        ref,
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          businessCallbacks.save(label);
          callback(event);
        },
      });
    },
  );
  return { ...actual, Button };
});

beforeEach(() => {
  businessCallbacks.save.mockClear();
  const original = HTMLElement.prototype.getBoundingClientRect;
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return this.classList.contains('rain-workspace') ? new DOMRect(0, 0, 1800, 800) : original.call(this);
  });
});
afterEach(() => { vi.restoreAllMocks(); });

const noBusinessSave = () => expect(businessCallbacks.save).toHaveBeenCalledTimes(0);

describe('W7 N13 actual business callback isolation', () => {
  it('N13 R4 layout, temporary, pin, resize, focus and display/mode events call save zero times, explicit save once', () => {
    const { container } = render(<R4Recipe scene="grading" />);
    fireEvent.click(within(screen.getByRole('group', { name: '学生队列' })).getByRole('button', { name: '欧阳小明' }));
    fireEvent.click(within(screen.getByRole('group', { name: '批改题目' })).getByRole('button', { name: '第二题 · 案例分析' }));
    fireEvent.change(screen.getByRole('textbox', { name: '给当前作答的反馈' }), { target: { value: '第二题需要补充可核查的实例。' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: '当前作答得分' }), { target: { value: '9.2' } });
    const identity = container.querySelector('.nv5-recovery-identity strong')!.textContent;
    expect(identity).toContain('第二题 · 案例分析');
    expect(identity).toContain('欧阳小明');

    fireEvent.click(screen.getAllByRole('button', { name: '隐藏学生列表' })[0]!);
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '显示学生列表' }));
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '取消固定批改面板' }));
    expect(container.querySelector('.rain-workspace__region[data-region-id="review"]')).toHaveAttribute('data-temporary', 'true');
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '固定批改面板' }));
    expect(container.querySelector('.rain-workspace__region[data-region-id="review"]')).toHaveAttribute('data-temporary', 'false');
    noBusinessSave();

    const splitter = screen.getByRole('separator', { name: '调整学生列表宽度' });
    const beforeWidth = Number(splitter.getAttribute('aria-valuenow'));
    fireEvent.keyDown(splitter, { key: 'ArrowRight' });
    expect(Number(splitter.getAttribute('aria-valuenow'))).toBe(beforeWidth + 10);
    noBusinessSave();
    fireEvent.click(screen.getByRole('radio', { name: '按人批改' }));
    expect(screen.getByRole('radio', { name: '按人批改' })).toBeChecked();
    noBusinessSave();
    fireEvent.click(screen.getByRole('radio', { name: '大' }));
    expect(container.querySelector('.nv5-pdf-page')).toHaveAttribute('data-font-size', 'large');
    fireEvent.click(screen.getByRole('tab', { name: '原题材料.pdf' }));
    expect(screen.getByRole('tab', { name: '原题材料.pdf' })).toHaveAttribute('aria-selected', 'true');
    noBusinessSave();
    fireEvent.click(screen.getByRole('tab', { name: '智能批改' }));
    fireEvent.click(screen.getByRole('tab', { name: '我的批改' }));
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '专注内容' }));
    expect(container.querySelector('.rain-workspace')).toHaveAttribute('data-focused', 'true');
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
    expect(container.querySelector('.rain-workspace')).toHaveAttribute('data-focused', 'false');
    noBusinessSave();

    expect(container.querySelector('.nv5-recovery-identity strong')!.textContent).toBe(identity);
    expect(screen.getByRole('textbox', { name: '给当前作答的反馈' })).toHaveValue('第二题需要补充可核查的实例。');
    expect(screen.getByRole('spinbutton', { name: '当前作答得分' })).toHaveValue(9.2);
    expect(screen.getByText('输入保留于当前实例；未提交成绩')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '本地保存草稿' }));
    expect(businessCallbacks.save).toHaveBeenCalledExactlyOnceWith('本地保存草稿');
    expect(screen.getByText('已在本地保存草稿')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('已保存此作答的本地草稿，未提交成绩。');
  });

  it('N13 R6 layout and edit/preview/view switches call save zero times with form identity and draft retained', () => {
    const { container } = render(<R6Recipe />);
    fireEvent.change(screen.getByRole('textbox', { name: '课程名称' }), { target: { value: '数值计算 · 2026秋季' } });
    fireEvent.change(screen.getByRole('textbox', { name: '你希望我们改进的地方' }), { target: { value: '请补充误差分析和验证步骤。' } });
    expect(screen.getByRole('link', { name: '学习反馈' })).toHaveAttribute('aria-current', 'page');
    noBusinessSave();

    fireEvent.click(screen.getAllByRole('button', { name: '隐藏内部目录' })[0]!);
    fireEvent.click(screen.getByRole('button', { name: '显示内部目录' }));
    noBusinessSave();
    const splitter = screen.getByRole('separator', { name: '调整内部目录宽度' });
    const beforeWidth = Number(splitter.getAttribute('aria-valuenow'));
    fireEvent.keyDown(splitter, { key: 'ArrowRight', shiftKey: true });
    expect(Number(splitter.getAttribute('aria-valuenow'))).toBe(beforeWidth + 32);
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '取消固定编辑工具' }));
    expect(container.querySelector('.rain-workspace__region[data-region-id="fields"]')).toHaveAttribute('data-temporary', 'true');
    fireEvent.click(screen.getByRole('button', { name: '固定编辑工具' }));
    noBusinessSave();
    fireEvent.click(screen.getByRole('button', { name: '专注内容' }));
    expect(container.querySelector('.rain-workspace')).toHaveAttribute('data-focused', 'true');
    fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
    noBusinessSave();
    fireEvent.click(screen.getByRole('radio', { name: '填写预览' }));
    expect(screen.getByRole('button', { name: '完成预览' })).toBeVisible();
    noBusinessSave();
    fireEvent.click(screen.getByRole('radio', { name: '编辑表单' }));
    fireEvent.click(screen.getByRole('tab', { name: '表格' }));
    expect(screen.getByRole('table', { name: '学习反馈记录' })).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: '状态分组' }));
    fireEvent.click(screen.getByRole('tab', { name: '反馈表单' }));
    noBusinessSave();

    expect(screen.getByRole('link', { name: '学习反馈' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('textbox', { name: '课程名称' })).toHaveValue('数值计算 · 2026秋季');
    expect(screen.getByRole('textbox', { name: '你希望我们改进的地方' })).toHaveValue('请补充误差分析和验证步骤。');
    expect(container.querySelector('.nv5-recovery-identity small')).toHaveTextContent('学习反馈 / 反馈表单');
    fireEvent.click(screen.getByRole('button', { name: '本地保存示例' }));
    expect(businessCallbacks.save).toHaveBeenCalledExactlyOnceWith('本地保存示例');
    expect(screen.getByRole('status')).toHaveTextContent('当前表单示例已本地保留，未发送反馈。');
  });
});
