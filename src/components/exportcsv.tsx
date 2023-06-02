import React from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
//   [key: string]: number | string;
}

interface Props {
  customers: Customer[];
}

const ExportCustomersButton: React.FC<Props> = ({ customers }) => {
  const handleExportClick = () => {
    const csvContent = generateCSVContent(customers);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSVContent = (data: Customer[]) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header as keyof Customer]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  return <button onClick={handleExportClick}>Export Customers as CSV</button>;
};

export default ExportCustomersButton;
