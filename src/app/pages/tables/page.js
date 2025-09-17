"use client";
import { useTable } from "react-table";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/layout/DashboardLayout";

const TablePage = () => {
  // State to hold the station data
  const [data, setData] = useState([]);

  // Fetch data from the API on page load
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          "https://ffwc-api.bdservers.site/data_load/stations/"
        );
        const stations = await response.json();
        setData(stations); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
    };

    fetchStations();
  }, []);

  // Columns to display in the table
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "River", accessor: "river" },
      { Header: "Basin", accessor: "basin" },
      { Header: "Danger Level", accessor: "dangerlevel" },
      { Header: "Highest Water Level", accessor: "riverhighestwaterlevel" },
      { Header: "Division", accessor: "division" },
      { Header: "District", accessor: "district" },
      { Header: "Upazilla", accessor: "upazilla" },
      { Header: "Latitude", accessor: "lat" },
      { Header: "Longitude", accessor: "long" },
    ],
    []
  );

  // React-Table hook to manage the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <DashboardLayout>
      <div className="text-center p-2 font-semibold text-2xl text-gray-800 shadow-sm shadow-gray-400 mx-auto max-w-[fit-content] mb-2 rounded-sm bg-gray-100">
        Land Cover Table
      </div>

      {/* Table */}
      <table
        {...getTableProps()}
        className="min-w-full border border-gray-300 mt-3"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="p-2 border-b border-gray-300 bg-gray-200 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    className="p-2 border-b border-gray-300 text-left"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default TablePage;
