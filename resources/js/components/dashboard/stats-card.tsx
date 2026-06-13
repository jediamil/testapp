import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingCart,
  Search,
  ChevronDown
} from 'lucide-react';

interface Props {
    statsData: number;
    icon: string;
    description: string;
}

export default function StatsCard({
    statsData, icon, description
}: Props) {

    let iconComponent;
    switch(icon.toLocaleLowerCase()) {
        case 'package':
            iconComponent = <Package className="w-8 h-8 text-blue-400" />
            break;
        case 'shoppingcart':
            iconComponent = <ShoppingCart className="w-8 h-8 text-green-400" />
            break;
        case 'alerttriangle':
            iconComponent = <AlertTriangle className="w-8 h-8 text-yellow-400" />
            break;
        case 'trendingup':
            iconComponent = <TrendingUp className="w-8 h-8 text-red-400" />
            break;
        default: 
            iconComponent = null;
    }

    return (
        <div className="dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border dark:border-gray-800 p-6 dark:hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              {iconComponent}
              <span className="text-2xl font-bold dark:text-white text-gray-900">{statsData}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{description}</h3>
        </div>
    )
}