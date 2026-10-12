import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import {
  IconBriefcase,
  IconCurrencyRupee,
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EmployeeFormDialog from "@/features/employee/component/EmployeeFormDialog";
import {
  useDeactivateEmployee,
  useEmployee,
  useEmployees,
  useUpdateEmployee,
} from "@/features/employee/hooks/useEmployees";
import type { Employee } from "@/features/employee/types/employee.types";

const EMPTY_EMPLOYEES: Employee[] = [];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));

const formatSalary = (value: number | null) =>
  value === null ? "—" : `₹${value.toLocaleString("en-IN")}`;

const errorMessage = (error: Error) =>
  error instanceof AxiosError
    ? error.response?.data?.error?.message ?? error.message
    : error.message;

export default function Employees() {
  const [search, setSearch] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployeeId, setViewingEmployeeId] = useState<string | null>(null);
  const [deactivatingEmployee, setDeactivatingEmployee] = useState<Employee | null>(null);
  const employeesQuery = useEmployees();
  const deactivateMutation = useDeactivateEmployee();
  const updateMutation = useUpdateEmployee();
  const employees = employeesQuery.data?.data ?? EMPTY_EMPLOYEES;

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    return employees.filter((employee) => {
      if (!showInactive && !employee.isActive) return false;
      if (!query) return true;
      return [
        employee.fullName,
        employee.empCode.toString(),
        employee.mobile,
        employee.email ?? "",
        employee.role,
        employee.department ?? "",
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [employees, search, showInactive]);

  const activeEmployees = employees.filter((employee) => employee.isActive);
  const totalPayroll = activeEmployees.reduce(
    (sum, employee) => sum + (employee.salary ?? 0),
    0,
  );

  const openCreateForm = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const selectedEmployeeQuery = useEmployee(viewingEmployeeId);
  const selectedEmployee = selectedEmployeeQuery.data?.data;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-xl font-bold">Employees</h1>
          <p className="text-sm text-muted-foreground">
            Manage employee records, contact details, and employment status.
          </p>
        </div>
        <Button className="gap-2" onClick={openCreateForm}>
          <IconPlus size={16} /> Add employee
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { title: "Active employees", value: activeEmployees.length, icon: IconUsers },
          { title: "Departments", value: new Set(activeEmployees.map((employee) => employee.department).filter(Boolean)).size, icon: IconBriefcase },
          { title: "Monthly payroll", value: formatSalary(totalPayroll), icon: IconCurrencyRupee },
        ].map(({ title, value, icon: Icon }) => (
          <Card key={title} className="border border-border shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{title}</p>
              </div>
              <Icon size={20} className="text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search employees"
                placeholder="Search name, ID, phone, role..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(event) => setShowInactive(event.target.checked)}
              />
              Show inactive employees
            </label>
          </div>

          {employeesQuery.isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading employees...</p>
          ) : employeesQuery.isError ? (
            <div className="space-y-3 py-8 text-center">
              <p className="text-sm text-destructive">{errorMessage(employeesQuery.error)}</p>
              <Button variant="outline" size="sm" onClick={() => employeesQuery.refetch()}>
                Try again
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role / department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="font-medium">{employee.fullName}</div>
                      <div className="text-xs text-muted-foreground">EMP-{employee.empCode}</div>
                    </TableCell>
                    <TableCell>
                      <div>{employee.role.replace(/_/g, " ")}</div>
                      <div className="text-xs text-muted-foreground">{employee.department || "No department"}</div>
                    </TableCell>
                    <TableCell>
                      <div>{employee.mobile}</div>
                      <div className="text-xs text-muted-foreground">{employee.email || "No email"}</div>
                    </TableCell>
                    <TableCell>{formatSalary(employee.salary)}</TableCell>
                    <TableCell>{formatDate(employee.joinDate)}</TableCell>
                    <TableCell>
                      <Badge variant={employee.isActive ? "default" : "secondary"}>
                        {employee.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`View ${employee.fullName}`}
                          onClick={() => setViewingEmployeeId(employee.id)}
                        >
                          <IconEye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${employee.fullName}`}
                          onClick={() => openEditForm(employee)}
                        >
                          <IconEdit size={16} />
                        </Button>
                        {employee.isActive ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Deactivate ${employee.fullName}`}
                            onClick={() => setDeactivatingEmployee(employee)}
                          >
                            <IconTrash size={16} className="text-destructive" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={updateMutation.isPending}
                            onClick={() => updateMutation.mutate({ id: employee.id, isActive: true })}
                          >
                            Restore
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      {search ? "No employees match your search." : "No employees to show."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingEmployee(null);
        }}
        employee={editingEmployee}
      />

      <Dialog open={Boolean(viewingEmployeeId)} onOpenChange={(open) => !open && setViewingEmployeeId(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Employee details</DialogTitle>
          </DialogHeader>
          {selectedEmployeeQuery.isLoading ? (
            <p className="py-6 text-sm text-muted-foreground">Loading employee...</p>
          ) : selectedEmployeeQuery.isError ? (
            <p className="py-6 text-sm text-destructive">{errorMessage(selectedEmployeeQuery.error)}</p>
          ) : selectedEmployee ? (
            <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
              {[
                ["Name", selectedEmployee.fullName],
                ["Employee ID", `EMP-${selectedEmployee.empCode}`],
                ["Role", selectedEmployee.role.replace(/_/g, " ")],
                ["Department", selectedEmployee.department],
                ["Mobile", selectedEmployee.mobile],
                ["Email", selectedEmployee.email],
                ["Territory", selectedEmployee.territory],
                ["Monthly salary", formatSalary(selectedEmployee.salary)],
                ["Join date", formatDate(selectedEmployee.joinDate)],
                ["PAN", selectedEmployee.pan],
                ["Aadhaar", selectedEmployee.aadhar],
                ["Bank account", selectedEmployee.bankAccNo],
                ["IFSC", selectedEmployee.IFSC],
                ["Status", selectedEmployee.isActive ? "Active" : "Inactive"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value || "—"}</p>
                </div>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deactivatingEmployee)}
        onOpenChange={(open) => !open && setDeactivatingEmployee(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate this employee?</AlertDialogTitle>
            <AlertDialogDescription>
              {deactivatingEmployee?.fullName} will be marked inactive. Their record is retained and can be restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deactivateMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (!deactivatingEmployee) return;
                deactivateMutation.mutate(deactivatingEmployee.id, {
                  onSuccess: () => setDeactivatingEmployee(null),
                });
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deactivateMutation.isPending ? "Deactivating..." : "Deactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
