import React, { useState } from 'react';
import { Income } from '../../types/index';

type Props = {
  incomes: Array<Income>;
  selectIncome: (income: Income) => void;
  onEdit: (incomeId: number) => void;
};

const IncomeOverviewTable: React.FC<Props> = ({ incomes, selectIncome, onEdit }: Props) => {
  const [selectedIncomeId, setSelectedIncomeId] = useState<number | null>(null);

  const handleIncomeClick = (income: Income) => {
    selectIncome(income);
  };

  const handleCheckboxChange = (incomeId: number) => {
    const newSelectedIncomeId = selectedIncomeId === incomeId ? null : incomeId;
    setSelectedIncomeId(newSelectedIncomeId);
  };

  return (
    <>
      {incomes && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomes.map((income, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIncomeId === income.incomeId}
                    onChange={() => handleCheckboxChange(income.incomeId)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleIncomeClick(income)}>{income.category}</td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleIncomeClick(income)}>{income.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleIncomeClick(income)}>{new Date(income.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedIncomeId && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => onEdit(selectedIncomeId)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default IncomeOverviewTable;