import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { theme } from '../../theme';
import { DollarSign, Megaphone, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalDonors: 0
  });
  const [campaigns, setCampaigns] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [campsRes, donationsRes] = await Promise.all([
          axios.get('/campaigns?limit=1000'),
          axios.get('/donations?limit=1000')
        ]);
        
        const camps = campsRes.data.data || [];
        const donations = donationsRes.data.data || [];
        
        setCampaigns(camps);
        
        let total = 0;
        let active = 0;
        camps.forEach(c => {
          total += c.raisedAmount;
          if (c.isActive) active++;
        });

        // Group donations by month for the chart
        const monthlyData = {};
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        donations.forEach(d => {
          if (d.status === 'COMPLETED') {
            const date = new Date(d.createdAt);
            const month = monthNames[date.getMonth()];
            if (!monthlyData[month]) monthlyData[month] = 0;
            monthlyData[month] += d.amount;
          }
        });

        // Convert to array format for Recharts and sort chronologically
        const chartData = monthNames.map(m => ({
          name: m,
          amount: monthlyData[m] || 0
        })).filter((m, i) => i <= new Date().getMonth() || m.amount > 0);

        setRevenueData(chartData);

        // Count unique donors
        const uniqueDonors = new Set(donations.map(d => d.donorEmail)).size;

        setStats({
          totalRaised: total,
          totalCampaigns: camps.length,
          activeCampaigns: active,
          totalDonors: uniqueDonors
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);



  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Overview</h1>
        <p className="text-slate-500">Monitor your foundation's impact and donation metrics.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total Raised" 
          value={`$${stats.totalRaised.toLocaleString()}`} 
          icon={<DollarSign size={24} />} 
          color={theme.colors.primary} 
        />
        <StatCard 
          title="Total Campaigns" 
          value={stats.totalCampaigns} 
          icon={<Megaphone size={24} />} 
          color={theme.colors.accent} 
        />
        <StatCard 
          title="Active Campaigns" 
          value={stats.activeCampaigns} 
          icon={<TrendingUp size={24} />} 
          color="#10B981" 
        />
        <StatCard 
          title="Total Donors" 
          value={stats.totalDonors.toLocaleString()} 
          icon={<Users size={24} />} 
          color="#8B5CF6" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 lg:col-span-2 transition-shadow hover:shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800">Donation Revenue</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Monthly performance for 2026</p>
            </div>
            <div className="px-4 py-2 bg-slate-50 rounded-full border text-sm font-bold text-slate-600">
              Year 2026
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.primary} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={theme.colors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} tickFormatter={(val) => `$${val}`} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 20px', fontWeight: 'bold' }}
                  formatter={(value) => [`$${value}`, 'Donations']}
                />
                <Area type="monotone" dataKey="amount" stroke={theme.colors.primary} strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 transition-shadow hover:shadow-xl">
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-slate-800">Top Campaigns</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Highest funded initiatives</p>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaigns.sort((a,b) => b.raisedAmount - a.raisedAmount).slice(0, 5)} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="title" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} width={110} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Raised']} 
                />
                <Bar dataKey="raisedAmount" fill={theme.colors.accent} radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
