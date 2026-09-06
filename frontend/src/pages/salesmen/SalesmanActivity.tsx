import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/features/employee/types/employee.types";
import { IconRefresh, IconUsersGroup } from "@tabler/icons-react";
import SalesmenNotFound from "./SalesmenNotFound";

interface Props {
  salesmen: Employee[];
}

const SalesmanActivity = ({ salesmen }: Props) => {
  if (salesmen.length === 0) {
    return;
  }

  return (
    <Card className="border border-border shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-base font-semibold">
          Today's Activity Summary
        </CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {[
                "Salesman",
                "Territory",
                "Visits Done",
                "Pending",
                "Orders Booked",
                "Collection",
                "Status",
                "Last Seen",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-xs font-semibold whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesmen.map((sm: Employee) => (
              <TableRow key={sm.id} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {sm?.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium">{sm?.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {sm.territory}
                </TableCell>
                <TableCell className="text-start font-medium">{0}</TableCell>
                <TableCell className="text-start">
                  <span className={`font-medium `}>{0}</span>
                </TableCell>
                <TableCell className="text-start font-medium text-primary">
                  {0}
                </TableCell>
                <TableCell className="font-semibold text-emerald-700">
                  ₹{0}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      sm.isActive
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs"
                    }
                  >
                    {sm?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  Never
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default SalesmanActivity;
