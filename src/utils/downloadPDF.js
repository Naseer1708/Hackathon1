import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadDashboardPDF = async (studentName) => {
  try {
    const element = document.getElementById("dashboard-content-pdf");
    if (!element) {
      alert("Dashboard content not found!");
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    pdf.setFontSize(16);
    pdf.text(`Student Performance Report - ${studentName}`, 15, 10);
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 20);

    pdf.addImage(imgData, "PNG", 0, 30, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${studentName}_Performance_Report.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};
