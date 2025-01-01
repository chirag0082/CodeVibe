import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = ({
  title = "Report",
  columns = [],
  data = [],
  filename = "Report.pdf",
}) => {
  const doc = new jsPDF();

  doc.setFont("helvetica");

  doc.setFontSize(16);
  doc.text(title, 14, 20);
  const rows = data.map((item) =>
    columns.map((col) => {
      if (col.format && typeof col.format === "function") {
        return col.format(item[col.field]);
      }
      return item[col.field];
    })
  );

  const columnHeaders = columns.map((col) => col.header);

  autoTable(doc, {
    head: [columnHeaders],
    body: rows,
    startY: 26,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 3,
      overflow: "linebreak",
      cellWidth: "auto",
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontSize: 9,
      fontStyle: "normal",
      halign: "center",
      cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
      minCellWidth: 16,
    },
  });

  doc.save(filename);
};

export default generatePDF;
