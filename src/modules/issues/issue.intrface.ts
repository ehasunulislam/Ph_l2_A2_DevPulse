export interface Interface_of_issue {
  title: string;
  description: string;
  
  type?: "bug" | "feature_request";

  status?: "open" | "in_progress" | "resolved";
}
