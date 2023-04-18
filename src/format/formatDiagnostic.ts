import { Diagnostic, MarkupContent } from "vscode-languageserver-types";
import { title } from "../components";
import { d } from "../utils";
import { embedSymbolLinks } from "./embedSymbolLinks";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { identSentences } from "./identSentences";

export function formatDiagnostic(diagnostic: Diagnostic, format: (type: string) => string) {
  const newDiagnostic = embedSymbolLinks(diagnostic);

  const markdownString: MarkupContent = {
    kind: "markdown",
    value: d/*html*/ `
    ${title(newDiagnostic)}
    <span>
    ${formatDiagnosticMessage(identSentences(newDiagnostic.message), format)}
    </span>
  `
  };

  // markdownString.isTrusted = true;
  // markdownString.supportHtml = true;

  return markdownString;
}
