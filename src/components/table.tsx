interface TableProps {
  headers: string[];
  rows: string[][];
}

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table className="w-full border border-gray-300 rounded-md mb-4">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h, idx) => (
            <th
              key={idx}
              className="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx}>
            {r.map((c, cidx) => (
              <td key={cidx} className="border border-gray-300 px-4 py-2">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
