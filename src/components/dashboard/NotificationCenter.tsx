import { Bell, Check, MessageSquare, AlertTriangle, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
    { id: 1, type: "alert", title: "Shift Conflict", message: "Officer Roberts has overlapping shifts on Monday.", time: "10m ago", read: false },
    { id: 2, type: "message", title: "New Message", message: "Client requested an extra guard for Friday's event.", time: "30m ago", read: false },
    { id: 3, type: "info", title: "System Update", message: "Maintenance scheduled for Sunday at 2 AM.", time: "2h ago", read: true },
    { id: 4, type: "alert", title: "License Expiring", message: "Officer Smith's armed license expires in 5 days.", time: "5h ago", read: false },
];

const NotificationCenter = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-muted/50">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-border bg-muted/20">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Notifications</h4>
                        <span className="text-xs text-muted-foreground">3 Unread</span>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="px-4 pt-2">
                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="alerts">Alerts</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="m-0">
                        <ScrollArea className="h-[300px]">
                            <div className="flex flex-col">
                                {mockNotifications.map((notif) => (
                                    <div key={notif.id} className={`p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 p-1.5 rounded-full ${notif.type === 'alert' ? 'bg-red-500/10 text-red-500' :
                                                    notif.type === 'message' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-gray-500/10 text-gray-500'
                                                }`}>
                                                {notif.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                                                {notif.type === 'message' && <MessageSquare className="h-4 w-4" />}
                                                {notif.type === 'info' && <Info className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{notif.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {notif.message}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground pt-1">{notif.time}</p>
                                            </div>
                                            {!notif.read && (
                                                <span className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="alerts" className="m-0">
                        <ScrollArea className="h-[300px]">
                            <div className="flex flex-col">
                                {mockNotifications.filter(n => n.type === 'alert').map((notif) => (
                                    <div key={notif.id} className="p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors bg-primary/5">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 p-1.5 rounded-full bg-red-500/10 text-red-500">
                                                <AlertTriangle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{notif.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {notif.message}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground pt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>

                <div className="p-2 border-t border-border bg-muted/20 flex justify-center">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-8 w-full">
                        Mark all as read
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationCenter;
