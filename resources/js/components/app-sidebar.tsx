import { Link } from '@inertiajs/react';
import { LayoutGrid, StretchHorizontal, Logs, Percent, Plus } from 'lucide-react';
import AppLogo from '@/components/app-logo';
// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { index, calculator } from '@/routes/inventory';
import { logs } from '@/routes/activity';
import { dashboard } from '@/routes'
import { calcindex } from '@/routes/profitcalculator';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: index(),
        icon: StretchHorizontal,
    },
    {
        title: 'Activity Logs',
        href: logs(),
        icon: Logs,
    },
    {
        title: 'Profit calculator',
        href: calculator(),
        icon: Percent,
    },
    {
        title: 'Calculator',
        href: calcindex(),
        icon: Plus,
    },
];

const FooterNavItems: NavItem[] = [
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}