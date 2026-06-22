import { dashboard } from '@/routes';
import StatsCard from '@/components/dashboard/stats-card'; 

interface StockItems {
  stocks: number;
  min_stock: number;
}

interface Props {
  StockItems: StockItems[];
}

export default function Dashboard({StockItems}: Props)  {

  // sum total items in database
  const totalItems = StockItems.length;

  // sum low stock items in database
  const lowStockItems = StockItems.filter(item => item.stocks !== 0 && item.stocks <= item.min_stock).length;

  // sum out of stock items in database
  const outOfStockItems = StockItems.filter(item => item.stocks === 0).length;

  // sum available stocks in database
  const totalStocks = StockItems.reduce((sum, item) => sum + item.stocks, 0);
  
  return (
    <div className="min-h-screen text-gray-100">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-400">Track and manage your stock levels</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard   
            statsData={totalItems}
            icon={'package'}
            description={'Total Items'}
          />
          
          <StatsCard 
            statsData={totalStocks}
            icon={'ShoppingCart'}
            description={'Total Stocks'}
          />

          <StatsCard 
            statsData={lowStockItems}
            icon={'alerttriangle'}
            description={'Low Stocks'}
          />

          <StatsCard 
            statsData={outOfStockItems}
            icon={'trendingup'}
            description={'Out Of Stocks'}
          />
          
        </div>

        {/* Filters */}


        {/* Items Table */}


        {/* Footer note */}

      </div>
    </div>
  );
}

Dashboard.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: dashboard(),
    },
  ],
};