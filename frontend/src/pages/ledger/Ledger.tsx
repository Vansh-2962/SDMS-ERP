import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Separator } from '../../components/ui/separator';
import {
  IconBook, IconSearch, IconDownload, IconTruckDelivery, IconBuildingStore,
  IconArrowUpRight, IconArrowDownRight, IconCurrencyRupee,
} from '@tabler/icons-react';

function LedgerEntries({ entries }: { entries: any[] }) {
  let balance = entries[0]?.openingBalance || 0;
  const rows: any[] = [];
  entries.forEach((e) => {
    if (e.type === 'debit') balance += e.amount;
    else balance -= e.amount;
    rows.push({ ...e, closingBalance: balance });
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {['Date', 'Particulars', 'Type', 'Debit (₹)', 'Credit (₹)', 'Balance (₹)'].map((h) => (
              <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className={`hover:bg-muted/30 ${row.type === 'credit' ? 'bg-emerald-50/30' : ''}`}>
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{row.date}</TableCell>
              <TableCell className="text-sm font-medium">{row.particulars}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${row.type === 'debit' ? 'text-red-600' : 'text-emerald-600'}`}>
                  {row.type === 'debit' ? <IconArrowDownRight size={12} /> : <IconArrowUpRight size={12} />}
                  {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                </span>
              </TableCell>
              <TableCell className={`font-medium text-sm ${row.type === 'debit' ? 'text-red-700' : 'text-muted-foreground'}`}>
                {row.type === 'debit' ? `₹${row.amount.toLocaleString('en-IN')}` : '—'}
              </TableCell>
              <TableCell className={`font-medium text-sm ${row.type === 'credit' ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                {row.type === 'credit' ? `₹${row.amount.toLocaleString('en-IN')}` : '—'}
              </TableCell>
              <TableCell className={`font-bold text-sm ${row.closingBalance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                ₹{Math.abs(row.closingBalance).toLocaleString('en-IN')}
                <span className="text-xs font-normal ml-1">{row.closingBalance > 0 ? 'Dr' : 'Cr'}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const distLedger: Record<string, any> = {
  'Ravi Distributors': {
    openingBalance: 45000,
    creditLimit: 200000,
    paymentTerms: '30 days',
    entries: [
      { date: '2024-03-01', particulars: 'Opening Balance', type: 'debit', amount: 45000, openingBalance: 0 },
      { date: '2024-03-15', particulars: 'INV-2024-001 — Sale', type: 'debit', amount: 9660 },
      { date: '2024-03-20', particulars: 'PAY001 — NEFT Receipt', type: 'credit', amount: 9660 },
      { date: '2024-03-22', particulars: 'CN-2024-001 — Credit Note', type: 'credit', amount: 3360 },
      { date: '2024-03-28', particulars: 'INV-2024-008 — Sale', type: 'debit', amount: 15200 },
    ],
  },
  'North India Traders': {
    openingBalance: 150000,
    creditLimit: 1000000,
    paymentTerms: '60 days',
    entries: [
      { date: '2024-03-01', particulars: 'Opening Balance', type: 'debit', amount: 150000, openingBalance: 0 },
      { date: '2024-03-18', particulars: 'INV-2024-004 — Sale', type: 'debit', amount: 38080 },
    ],
  },
  'Chennai Wholesale Hub': {
    openingBalance: 65000,
    creditLimit: 300000,
    paymentTerms: '45 days',
    entries: [
      { date: '2024-03-01', particulars: 'Opening Balance', type: 'debit', amount: 65000, openingBalance: 0 },
      { date: '2024-03-19', particulars: 'INV-2024-005 — Sale', type: 'debit', amount: 10710 },
      { date: '2024-03-25', particulars: 'PAY005 — Cash Receipt', type: 'credit', amount: 10710 },
    ],
  },
};

const retailLedger: Record<string, any> = {
  'Spice Mart Retail': {
    openingBalance: 12000,
    creditLimit: 50000,
    paymentTerms: '15 days',
    entries: [
      { date: '2024-03-01', particulars: 'Opening Balance', type: 'debit', amount: 12000, openingBalance: 0 },
      { date: '2024-03-17', particulars: 'INV-2024-003 — Sale', type: 'debit', amount: 1575 },
      { date: '2024-03-23', particulars: 'PAY003 — UPI Receipt', type: 'credit', amount: 1575 },
    ],
  },
  'Quick Grocer': {
    openingBalance: 8500,
    creditLimit: 75000,
    paymentTerms: '30 days',
    entries: [
      { date: '2024-03-01', particulars: 'Opening Balance', type: 'debit', amount: 8500, openingBalance: 0 },
      { date: '2024-03-14', particulars: 'INV-2024-007 — Sale', type: 'debit', amount: 4200 },
    ],
  },
};

export default function Ledger() {
  const [distSelected, setDistSelected] = useState('Ravi Distributors');
  const [retailSelected, setRetailSelected] = useState('Spice Mart Retail');

  function LedgerHeader({ data, name }: { data: any; name: string }) {
    const totalDebit  = data.entries.reduce((s: number, e: any) => s + (e.type === 'debit' ? e.amount : 0), 0);
    const totalCredit = data.entries.reduce((s: number, e: any) => s + (e.type === 'credit' ? e.amount : 0), 0);
    const outstanding = totalDebit - totalCredit;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Account Name', value: name },
          { label: 'Credit Limit', value: `₹${data.creditLimit.toLocaleString('en-IN')}` },
          { label: 'Payment Terms', value: data.paymentTerms },
          { label: 'Outstanding', value: `₹${outstanding.toLocaleString('en-IN')}`, highlight: outstanding > 0 },
        ].map(({ label, value, highlight }) => (
          <div key={label} className={`p-3 rounded-xl ${highlight ? 'bg-red-50 border border-red-100' : 'bg-muted/50'}`}>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`font-semibold text-sm mt-0.5 ${highlight ? 'text-red-700' : 'text-foreground'}`}>{value}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <IconBook size={16} className="text-primary" />
          Party ledgers with complete transaction history
        </div>
        <Button variant="outline" className="h-9 gap-1.5">
          <IconDownload size={15} /> Export PDF
        </Button>
      </div>

      <Tabs defaultValue="distributor">
        <TabsList className="bg-muted/60 p-1 gap-1">
          <TabsTrigger value="distributor" className="text-xs gap-1.5">
            <IconTruckDelivery size={13} /> Distributor Ledger
          </TabsTrigger>
          <TabsTrigger value="retailer" className="text-xs gap-1.5">
            <IconBuildingStore size={13} /> Retailer Ledger
          </TabsTrigger>
        </TabsList>

        {/* Distributor Ledger */}
        <TabsContent value="distributor" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <Select value={distSelected} onValueChange={setDistSelected}>
              <SelectTrigger className="w-60 h-9">
                <SelectValue placeholder="Select distributor" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(distLedger).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="date" defaultValue="2024-03-01" className="w-36 h-9" />
            <Input type="date" defaultValue="2024-03-31" className="w-36 h-9" />
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><IconDownload size={14} /> Export</Button>
          </div>
          {distLedger[distSelected] && (
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-base">{distSelected} — Account Ledger</CardTitle>
              </CardHeader>
              <CardContent>
                <LedgerHeader data={distLedger[distSelected]} name={distSelected} />
                <LedgerEntries entries={distLedger[distSelected].entries} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Retailer Ledger */}
        <TabsContent value="retailer" className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <Select value={retailSelected} onValueChange={setRetailSelected}>
              <SelectTrigger className="w-60 h-9">
                <SelectValue placeholder="Select retailer" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(retailLedger).map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="date" defaultValue="2024-03-01" className="w-36 h-9" />
            <Input type="date" defaultValue="2024-03-31" className="w-36 h-9" />
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><IconDownload size={14} /> Export</Button>
          </div>
          {retailLedger[retailSelected] && (
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-base">{retailSelected} — Account Ledger</CardTitle>
              </CardHeader>
              <CardContent>
                <LedgerHeader data={retailLedger[retailSelected]} name={retailSelected} />
                <LedgerEntries entries={retailLedger[retailSelected].entries} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
