import { DataTableRecipe } from "../../data-table-recipe";
import "./page.css";

/** BM-A reuses the accepted view and host state; the full dataset is local and fictional. */
export function MaterialManagementScenario() {
  return <section aria-label="课程资料管理" data-scenario="bm-a" className="data-table-consumer"><DataTableRecipe /></section>;
}
