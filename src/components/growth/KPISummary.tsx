import { Smartphone, Apple, Bot, Globe, Users } from 'lucide-react';
import KPICard from './KPICard';
import { MonthlyKPIData } from '../../types/growth';

interface KPISummaryProps {
  data: MonthlyKPIData;
}

export default function KPISummary({ data }: KPISummaryProps) {
  const { currentMonth: c, prevMonth: p, currentMonthName, prevMonthName } = data;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">Monthly KPIs</p>
        <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-2.5 py-1 font-medium">
          {currentMonthName} vs {prevMonthName}
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          label="Total App Downloads"
          value={c.totalAppDownloads}
          prev={p.totalAppDownloads}
          icon={<Smartphone size={18} />}
          color="text-blue-600"
          bgColor="bg-blue-50"
          currentPeriodLabel={currentMonthName}
          prevPeriodLabel={prevMonthName}
        />
        <KPICard
          label="iOS Downloads"
          value={c.iosDownloads}
          prev={p.iosDownloads}
          icon={<Apple size={18} />}
          color="text-sky-600"
          bgColor="bg-sky-50"
          currentPeriodLabel={currentMonthName}
          prevPeriodLabel={prevMonthName}
        />
        <KPICard
          label="Android Downloads"
          value={c.androidDownloads}
          prev={p.androidDownloads}
          icon={<Bot size={18} />}
          color="text-green-600"
          bgColor="bg-green-50"
          currentPeriodLabel={currentMonthName}
          prevPeriodLabel={prevMonthName}
        />
        <KPICard
          label="Web Registrations"
          value={c.webRegistrations}
          prev={p.webRegistrations}
          icon={<Globe size={18} />}
          color="text-orange-500"
          bgColor="bg-orange-50"
          currentPeriodLabel={currentMonthName}
          prevPeriodLabel={prevMonthName}
        />
        <KPICard
          label="Total New Users"
          value={c.totalNewUsers}
          prev={p.totalNewUsers}
          icon={<Users size={18} />}
          color="text-teal-600"
          bgColor="bg-teal-50"
          currentPeriodLabel={currentMonthName}
          prevPeriodLabel={prevMonthName}
        />
      </div>
    </div>
  );
}
