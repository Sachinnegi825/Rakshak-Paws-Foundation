import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { theme } from '../../theme';
import { Download, FileText, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminDonationsList() {
  const [donations, setDonations] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);
      const [donationsRes, reportsRes] = await Promise.all([
        axios.get(`/donations?page=${currentPage}&limit=10`),
        axios.get('/reports')
      ]);
      setDonations(donationsRes.data.data);
      setPagination(donationsRes.data.pagination);
      setReports(reportsRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await axios.post('/reports');
      toast.success('Report generation started. Check back in a few seconds.');
      fetchData();
    } catch (error) {
      toast.error('Failed to start report generation');
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle size={16} className="text-green-500" />;
      case 'PENDING': return <Clock size={16} className="text-amber-500 animate-pulse" />;
      case 'FAILED': return <AlertCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Donations & Reports</h1>
        <p className="text-slate-500">Track all donations and generate PDF transaction reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Donations Table */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[700px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-slate-800">Transaction History</h2>
            <div className="px-3 py-1 bg-slate-50 border rounded-full text-sm font-bold text-slate-600">
              Total: {donations.length}
            </div>
          </div>
          <div className="overflow-auto flex-1 p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [1, 2, 3, 4, 5, 6].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
                        <div className="h-4 bg-slate-200 rounded w-48" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-slate-200 rounded w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-6 bg-slate-200 rounded-full" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-5 bg-slate-200 rounded w-24" />
                      </td>
                    </tr>
                  ))
                ) : donations.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-10">No donations found.</td></tr>
                ) : (
                  donations.map((d) => (
                    <tr key={d._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{d.donorName || 'Anonymous'}</p>
                        <p className="text-sm text-slate-500">{d.donorEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 text-lg">${d.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          d.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                          d.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 sticky bottom-0">
              <span className="text-sm text-slate-500 font-medium">
                Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </span>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  disabled={page === pagination.pages} 
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reports Panel */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col h-[700px]">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Data Center
          </h2>
          
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-white mb-8 transition-colors disabled:opacity-50"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <FileText size={18} />}
            Generate New PDF
          </button>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Recent Reports</h3>
            <button onClick={fetchData} className="text-slate-400 hover:text-primary transition-colors" title="Refresh">
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {reports.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No reports generated yet.</p>
            ) : (
              reports.map((report) => (
                <div key={report._id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-slate-700 text-sm">{report.title}</p>
                    {getStatusIcon(report.status)}
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{new Date(report.createdAt).toLocaleString()}</p>
                  
                  {report.status === 'COMPLETED' ? (
                    <a 
                      href={report.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:text-primary hover:border-primary transition-colors"
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  ) : report.status === 'FAILED' ? (
                    <p className="text-xs text-red-500 font-medium">Failed: {report.error}</p>
                  ) : (
                    <div className="w-full flex justify-center py-2 bg-white/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-400 cursor-not-allowed">
                      Processing...
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
