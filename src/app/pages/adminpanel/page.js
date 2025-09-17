"use client";

import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayout from "@/app/layout/DashboardLayout";

// Register Chart.js components
ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function AdminPanel() {
  // State variables
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [chartType, setChartType] = useState("line");
  const [selectedDataSet, setSelectedDataSet] = useState("dataset1");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload (dummy functionality)
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    // Simulate a fake upload process with a progress bar
    setUploadProgress(0);
    const fakeUpload = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeUpload);
          alert(`File "${file.name}" uploaded successfully (dummy functionality).`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Dummy data sets
  const datasets = {
    dataset1: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    dataset2: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      data: [120, 150, 180, 200],
    },
    dataset3: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [20, 30, 70, 90],
    },
  };

  const chartData = {
    labels: datasets[selectedDataSet].labels,
    datasets: [
      {
        label: "Water Level",
        data: datasets[selectedDataSet].data,
        fill: true,
        backgroundColor: chartType === "pie" ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"] : "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4, // Make line chart smoother
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={chartData} />;
      case "bar":
        return <Bar data={chartData} />;
      case "pie":
        return <Pie data={chartData} />;
      default:
        return <Line data={chartData} />;
    }
  };

  return (
    <DashboardLayout>
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Panel</h1>

      {/* File Upload Section */}
      <div style={styles.card}>
        <h2>Upload Flood Data</h2>
        <input type="file" accept=".csv,.json" onChange={handleFileChange} style={styles.input} />
        {file && (
          <div style={styles.fileInfo}>
            <p><strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
          </div>
        )}
        <button onClick={handleUpload} style={styles.button}>
          Upload
        </button>
        {uploadProgress > 0 && (
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${uploadProgress}%`,
                backgroundColor: uploadProgress < 100 ? "#4caf50" : "#00C851",
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Chart Type Selector */}
      <div style={styles.card}>
        <h3>Select Chart Type</h3>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setChartType("line")}
            style={chartType === "line" ? styles.activeButton : styles.button}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("bar")}
            style={chartType === "bar" ? styles.activeButton : styles.button}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType("pie")}
            style={chartType === "pie" ? styles.activeButton : styles.button}
          >
            Pie Chart
          </button>
        </div>
      </div>

      {/* Dataset Selector */}
      <div style={styles.card}>
        <h3>Select Data Set</h3>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setSelectedDataSet("dataset1")}
            style={selectedDataSet === "dataset1" ? styles.activeButton : styles.button}
          >
            Dataset 1
          </button>
          <button
            onClick={() => setSelectedDataSet("dataset2")}
            style={selectedDataSet === "dataset2" ? styles.activeButton : styles.button}
          >
            Dataset 2
          </button>
          <button
            onClick={() => setSelectedDataSet("dataset3")}
            style={selectedDataSet === "dataset3" ? styles.activeButton : styles.button}
          >
            Dataset 3
          </button>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div style={styles.card}>
        <h2>Flood Data Visualization</h2>
        {renderChart()}
      </div>
    </div>
    </DashboardLayout>
  );
}

// Styles using CSS-in-JS approach
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "36px",
    marginBottom: "30px",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    width: "80%",
    maxWidth: "700px",
  },
  input: {
    display: "block",
    marginBottom: "10px",
  },
  fileInfo: {
    marginBottom: "10px",
    fontStyle: "italic",
    color: "#555",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  activeButton: {
    backgroundColor: "#218838",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  progressBarContainer: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: "5px",
  },
  progressBar: {
    height: "10px",
    borderRadius: "5px",
    transition: "width 0.3s ease",
  },
};

