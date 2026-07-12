"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Card,
  CardContent,
} from "@mui/material";

// Icons
import GlobeIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ExploreIcon from "@mui/icons-material/Explore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DomainIcon from "@mui/icons-material/Domain";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Custom admin components
import AdminBreadcrumbs from "../../components/AdminBreadcrumbs";
import CustomDataTable from "../../components/CustomDataTable";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

// Toast alerts
import { toast } from "react-toastify";

// Location Services
import { LocationBulkService } from "../../../lib/services/locationBulkService";

// Location API Services
import { StateService } from "../../../lib/services/stateService";
import { DistrictService } from "../../../lib/services/districtService";
import { CityService } from "../../../lib/services/cityService";
import { WardService } from "../../../lib/services/wardService";
import { VikasKhandService } from "../../../lib/services/vikasKhandService";
import { GramPanchayatService } from "../../../lib/services/gramPanchayatService";
import { VillageService } from "../../../lib/services/villageService";

// --- Types & Interfaces ---

export interface StateData {
  state_id: number;
  state_title: string;
  status: string;
}

export interface DistrictData {
  districtid: number;
  district_title: string;
  state_id: number;
  district_description?: string;
  district_status: string;
  state_name?: string;
}

export interface CityData {
  id: number;
  name: string;
  districtid: number;
  state_id: number;
  description?: string;
  status: string;
  district_name?: string;
  state_name?: string;
}

export interface WardData {
  id: number;
  city_ward_name: string;
  city_id: number;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  state_name?: string;
}

export interface VikasKhandData {
  id: number;
  vikas_khand_name: string;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  state_name?: string;
}

export interface GramPanchayatData {
  id: number;
  panchayat_name: string;
  vikas_khand_id: number;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  vikas_khand_name?: string;
  state_name?: string;
}

export interface VillageData {
  id: number;
  villages_name: string;
  panchayat_id: number;
  vikas_khand_id: number;
  district_id: number;
  state_id?: number;
  status: string;
  gram_panchayat_name?: string;
  vikas_khand_name?: string;
  district_name?: string;
  state_name?: string;
}

export interface ZoneData {
  id: string;
  name: string;
  city: string;
  slaHours: string;
  status: "Active" | "Inactive";
}

export interface OutletData {
  id: string;
  storeName: string;
  vendorName: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  status: "Active" | "Pending" | "Suspended";
}

export interface ServiceAreaData {
  id: string;
  areaName: string;
  pincode: string;
  minOrder: string;
  deliveryFee: string;
  status: "Active" | "Inactive";
}

export interface WarehouseData {
  id: string;
  hubName: string;
  manager: string;
  capacitySqFt: string;
  phone: string;
  address: string;
  status: "Active" | "Maintenance";
}

// --- Dummy Datasets ---

const initialStates: StateData[] = [
  { state_id: 7, state_title: "Chhattisgarh", status: "Active" },
];

const initialDistricts: DistrictData[] = [
  { districtid: 677, district_title: "Korba", state_id: 7, district_description: "Korba District", district_status: "Active", state_name: "Chhattisgarh" },
];

const initialCities: CityData[] = [
  { id: 6600, name: "Gevra", districtid: 677, state_id: 7, description: "Gevra City", status: "Active", district_name: "Korba", state_name: "Chhattisgarh" },
];

const initialWards: WardData[] = [
  { id: 1, city_ward_name: "Gevra Ward", city_id: 6600, district_id: 677, state_id: 7, status: "Active", district_name: "Korba", state_name: "Chhattisgarh" },
];

const initialVikasKhands: VikasKhandData[] = [
  { id: 6, vikas_khand_name: "Korba vikas-khand", district_id: 677, state_id: 7, status: "Active", district_name: "Korba", state_name: "Chhattisgarh" },
];

const initialGramPanchayats: GramPanchayatData[] = [
  { id: 118, panchayat_name: "panchayat korba", vikas_khand_id: 6, district_id: 677, state_id: 7, status: "Active", district_name: "Korba", vikas_khand_name: "Korba vikas-khand", state_name: "Chhattisgarh" },
];

const initialVillages: VillageData[] = [
  { id: 1, villages_name: "Korba", panchayat_id: 118, vikas_khand_id: 6, district_id: 677, state_id: 7, status: "Active", gram_panchayat_name: "panchayat korba", vikas_khand_name: "Korba vikas-khand", district_name: "Korba", state_name: "Chhattisgarh" },
];

const initialZones: ZoneData[] = [
  { id: "ZON-001", name: "Downtown SF", city: "San Francisco", slaHours: "2", status: "Active" },
  { id: "ZON-002", name: "Manhattan Core", city: "New York City", slaHours: "4", status: "Active" },
  { id: "ZON-003", name: "South Mumbai", city: "Mumbai", slaHours: "3", status: "Active" },
  { id: "ZON-004", name: "West LA", city: "Los Angeles", slaHours: "6", status: "Active" },
  { id: "ZON-005", name: "North Delhi", city: "New Delhi", slaHours: "8", status: "Inactive" },
];

const initialOutlets: OutletData[] = [
  { id: "OUT-001", storeName: "Fresh Mart Downtown", vendorName: "John Doe", address: "123 Main St", city: "San Francisco", phone: "+1 (555) 123-4567", hours: "08:00 AM - 10:00 PM", status: "Active" },
  { id: "OUT-002", storeName: "Beauty Essentials Spa", vendorName: "Sarah Smith", address: "789 Maple Ave", city: "New York City", phone: "+1 (555) 987-6543", hours: "09:00 AM - 08:00 PM", status: "Active" },
  { id: "OUT-003", storeName: "Gourmet Foods Hub", vendorName: "Arjun Mehta", address: "456 Link Rd", city: "Mumbai", phone: "+91 98765 43210", hours: "10:00 AM - 11:00 PM", status: "Pending" },
  { id: "OUT-004", storeName: "Organic Organics", vendorName: "Priya Sharma", address: "55 Orchid St", city: "New Delhi", phone: "+91 99999 88888", hours: "09:00 AM - 09:00 PM", status: "Suspended" },
];

const initialServiceAreas: ServiceAreaData[] = [
  { id: "SER-001", areaName: "SF Core Delivery", pincode: "94102", minOrder: "400", deliveryFee: "35", status: "Active" },
  { id: "SER-002", areaName: "Manhattan Prime", pincode: "10001", minOrder: "500", deliveryFee: "49", status: "Active" },
  { id: "SER-003", areaName: "South Mumbai Standard", pincode: "400001", minOrder: "300", deliveryFee: "20", status: "Active" },
  { id: "SER-004", areaName: "LA Westside Express", pincode: "90024", minOrder: "600", deliveryFee: "79", status: "Active" },
  { id: "SER-005", areaName: "East Delhi Hub", pincode: "110051", minOrder: "200", deliveryFee: "15", status: "Inactive" },
];

const initialWarehouses: WarehouseData[] = [
  { id: "WRH-001", hubName: "SF Central Warehouse", manager: "Mark Vance", capacitySqFt: "50000", phone: "+1 (555) 444-5555", address: "100 Logistics Blvd", status: "Active" },
  { id: "WRH-002", hubName: "NY Brooklyn Depot", manager: "Janet Rose", capacitySqFt: "35000", phone: "+1 (555) 333-2222", address: "25 Water St", status: "Active" },
  { id: "WRH-003", hubName: "Mumbai Logistics Hub", manager: "Rajesh Kumar", capacitySqFt: "75000", phone: "+91 91234 56789", address: "Sector 10, Navi Mumbai", status: "Active" },
  { id: "WRH-004", hubName: "Delhi North Point", manager: "Amit Singh", capacitySqFt: "40000", phone: "+91 98111 22233", address: "GT Karnal Rd", status: "Maintenance" },
];

export default function LocationsDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  // States for CRUD datasets
  const [statesList, setStatesList] = useState<StateData[]>(initialStates);
  const [districts, setDistricts] = useState<DistrictData[]>(initialDistricts);
  const [cities, setCities] = useState<CityData[]>(initialCities);
  const [wards, setWards] = useState<WardData[]>(initialWards);
  const [vikasKhands, setVikasKhands] = useState<VikasKhandData[]>(initialVikasKhands);
  const [gramPanchayats, setGramPanchayats] = useState<GramPanchayatData[]>(initialGramPanchayats);
  const [villages, setVillages] = useState<VillageData[]>(initialVillages);
  const [zones, setZones] = useState<ZoneData[]>(initialZones);
  const [outlets, setOutlets] = useState<OutletData[]>(initialOutlets);
  const [serviceAreas, setServiceAreas] = useState<ServiceAreaData[]>(initialServiceAreas);
  const [warehouses, setWarehouses] = useState<WarehouseData[]>(initialWarehouses);

  // Dialog management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State Values
  const [formValues, setFormValues] = useState<any>({});

  // Loading state for API requests
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchAllData = async () => {
    setIsTableLoading(true);
    try {
      const [
        statesRes,
        districtsRes,
        citiesRes,
        wardsRes,
        blocksRes,
        panchayatsRes,
        villagesRes
      ] = await Promise.allSettled([
        StateService.getAll(),
        DistrictService.getAll(),
        CityService.getAll(),
        WardService.getAll(),
        VikasKhandService.getAll(),
        GramPanchayatService.getAll(),
        VillageService.getAll(),
      ]);

      if (statesRes.status === "fulfilled") {
        setStatesList(statesRes.value);
      }

      if (districtsRes.status === "fulfilled") {
        setDistricts(districtsRes.value);
      }

      if (citiesRes.status === "fulfilled") {
        setCities(citiesRes.value);
      }

      if (wardsRes.status === "fulfilled") {
        setWards(wardsRes.value);
      }

      if (blocksRes.status === "fulfilled") {
        setVikasKhands(blocksRes.value);
      }

      if (panchayatsRes.status === "fulfilled") {
        setGramPanchayats(panchayatsRes.value);
      }

      if (villagesRes.status === "fulfilled") {
        setVillages(villagesRes.value);
      }

    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Failed to fetch location data from server.");
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Helper styles for status badges
  const getStatusChip = (status: any) => {
    let bgcolor = "#F1F3F4";
    let color = "#3C4043";
    let displayLabel = "Inactive";

    if (status !== undefined && status !== null) {
      const normalized = String(status).toLowerCase();
      if (normalized === "active" || normalized === "1" || normalized === "true") {
        bgcolor = "#E6F4EA";
        color = "#137333";
        displayLabel = "Active";
      } else if (normalized === "pending") {
        bgcolor = "#FEF3D6";
        color = "#B06000";
        displayLabel = "Pending";
      } else if (normalized === "inactive" || normalized === "suspended" || normalized === "0" || normalized === "false") {
        bgcolor = "#FCE8E6";
        color = "#C5221F";
        displayLabel = normalized === "suspended" ? "Suspended" : "Inactive";
      } else if (normalized === "maintenance") {
        bgcolor = "#E8F0FE";
        color = "#1A73E8";
        displayLabel = "Maintenance";
      } else {
        displayLabel = String(status);
      }
    }

    return (
      <Chip
        label={displayLabel}
        size="small"
        sx={{
          bgcolor,
          color,
          fontWeight: 600,
          fontSize: "11px",
          borderRadius: "8px",
        }}
      />
    );
  };

  // --- Column Declarations ---



  const stateColumns = [
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_title", label: "State Title", width: "250px", render: (r: StateData) => <Box sx={{ fontWeight: 600 }}>{r.state_title}</Box> },
    { id: "status", label: "Status", width: "120px", render: (r: StateData) => getStatusChip(r.status) },
  ];

  const districtColumns = [
    { id: "districtid", label: "District ID", width: "100px" },
    { id: "district_title", label: "District Title", width: "220px", render: (r: DistrictData) => <Box sx={{ fontWeight: 600 }}>{r.district_title}</Box> },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "200px" },
    { id: "district_description", label: "Description", width: "220px" },
    { id: "district_status", label: "Status", width: "120px", render: (r: DistrictData) => getStatusChip(r.district_status) },
  ];

  const cityColumns = [
    { id: "id", label: "ID", width: "100px" },
    { id: "name", label: "City Name", width: "200px", render: (r: CityData) => <Box sx={{ fontWeight: 600 }}>{r.name}</Box> },
    { id: "districtid", label: "District ID", width: "110px" },
    { id: "district_name", label: "District Name", width: "180px" },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "180px" },
    { id: "description", label: "Description", width: "200px" },
    { id: "status", label: "Status", width: "120px", render: (r: CityData) => getStatusChip(r.status) },
  ];

  const wardColumns = [
    { id: "id", label: "ID", width: "100px" },
    { id: "city_ward_name", label: "Ward Name", width: "220px", render: (r: WardData) => <Box sx={{ fontWeight: 600 }}>{r.city_ward_name}</Box> },
    { id: "city_id", label: "City ID", width: "100px" },
    { id: "district_id", label: "District ID", width: "110px" },
    { id: "district_name", label: "District Name", width: "180px" },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "180px" },
    { id: "status", label: "Status", width: "120px", render: (r: WardData) => getStatusChip(r.status) },
  ];

  const vikasKhandColumns = [
    { id: "id", label: "ID", width: "100px" },
    { id: "vikas_khand_name", label: "Vikas Khand / Block", width: "220px", render: (r: VikasKhandData) => <Box sx={{ fontWeight: 600 }}>{r.vikas_khand_name}</Box> },
    { id: "district_id", label: "District ID", width: "110px" },
    { id: "district_name", label: "District Name", width: "180px" },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "180px" },
    { id: "status", label: "Status", width: "120px", render: (r: VikasKhandData) => getStatusChip(r.status) },
  ];

  const gramPanchayatColumns = [
    { id: "id", label: "ID", width: "100px" },
    { id: "panchayat_name", label: "Gram Panchayat", width: "220px", render: (r: GramPanchayatData) => <Box sx={{ fontWeight: 600 }}>{r.panchayat_name}</Box> },
    { id: "vikas_khand_id", label: "Vikas Khand ID", width: "130px" },
    { id: "vikas_khand_name", label: "Vikas Khand Name", width: "180px" },
    { id: "district_id", label: "District ID", width: "110px" },
    { id: "district_name", label: "District Name", width: "180px" },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "180px" },
    { id: "status", label: "Status", width: "120px", render: (r: GramPanchayatData) => getStatusChip(r.status) },
  ];

  const villagesColumns = [
    { id: "id", label: "ID", width: "100px" },
    { id: "villages_name", label: "Village Name", width: "200px", render: (r: VillageData) => <Box sx={{ fontWeight: 600 }}>{r.villages_name}</Box> },
    { id: "panchayat_id", label: "Panchayat ID", width: "120px" },
    { id: "gram_panchayat_name", label: "Gram Panchayat Name", width: "180px" },
    { id: "vikas_khand_id", label: "Vikas Khand ID", width: "130px" },
    { id: "vikas_khand_name", label: "Vikas Khand Name", width: "180px" },
    { id: "district_id", label: "District ID", width: "110px" },
    { id: "district_name", label: "District Name", width: "180px" },
    { id: "state_id", label: "State ID", width: "100px" },
    { id: "state_name", label: "State Name", width: "180px" },
    { id: "status", label: "Status", width: "120px", render: (r: VillageData) => getStatusChip(r.status) },
  ];

  const zoneColumns = [
    { id: "id", label: "ID", width: "90px" },
    { id: "name", label: "Zone Name", width: "220px", render: (r: ZoneData) => <Box sx={{ fontWeight: 600 }}>{r.name}</Box> },
    { id: "city", label: "City Associated", width: "200px" },
    { id: "slaHours", label: "SLA (Hours)", width: "140px", render: (r: ZoneData) => `${r.slaHours} hours` },
    { id: "status", label: "Status", width: "110px", render: (r: ZoneData) => getStatusChip(r.status) },
  ];

  const outletColumns = [
    { id: "id", label: "Outlet ID", width: "100px" },
    { id: "storeName", label: "Store Name", width: "200px", render: (r: OutletData) => <Box sx={{ fontWeight: 600 }}>{r.storeName}</Box> },
    { id: "vendorName", label: "Merchant Owner", width: "180px" },
    { id: "phone", label: "Phone", width: "160px" },
    { id: "hours", label: "Operating Hours", width: "180px" },
    { id: "address", label: "Address", width: "240px" },
    { id: "status", label: "Status", width: "110px", render: (r: OutletData) => getStatusChip(r.status) },
  ];

  const serviceAreaColumns = [
    { id: "id", label: "Area ID", width: "100px" },
    { id: "areaName", label: "Area Name", width: "220px", render: (r: ServiceAreaData) => <Box sx={{ fontWeight: 600 }}>{r.areaName}</Box> },
    { id: "pincode", label: "Zip / Pin Code", width: "150px" },
    { id: "minOrder", label: "Min Order", width: "140px", render: (r: ServiceAreaData) => `₹${r.minOrder}` },
    { id: "deliveryFee", label: "Base Fee", width: "120px", render: (r: ServiceAreaData) => `₹${r.deliveryFee}` },
    { id: "status", label: "Status", width: "110px", render: (r: ServiceAreaData) => getStatusChip(r.status) },
  ];

  const warehouseColumns = [
    { id: "id", label: "Hub ID", width: "100px" },
    { id: "hubName", label: "Hub / Warehouse Name", width: "220px", render: (r: WarehouseData) => <Box sx={{ fontWeight: 600 }}>{r.hubName}</Box> },
    { id: "manager", label: "Hub Manager", width: "160px" },
    { id: "capacitySqFt", label: "Capacity (sq ft)", width: "160px", render: (r: WarehouseData) => `${Number(r.capacitySqFt).toLocaleString()} sqft` },
    { id: "phone", label: "Contact Phone", width: "160px" },
    { id: "address", label: "Full Address", width: "240px" },
    { id: "status", label: "Status", width: "120px", render: (r: WarehouseData) => getStatusChip(r.status) },
  ];

  // --- Bulk Location Actions ---

  const handleDownloadSample = async () => {
    try {
      toast.info("Downloading sample template...");
      const blob = await LocationBulkService.downloadSample();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "location_upload_sample.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success("Sample template downloaded successfully!");
    } catch (error: any) {
      console.error("Failed to download sample:", error);
      toast.error("Failed to download sample template.");
    }
  };

  const handleUploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsTableLoading(true);
    try {
      toast.info("Uploading and processing Excel file...");
      const res = await LocationBulkService.uploadExcel(file);
      if (res.success) {
        const sum = res.summary;
        let createdMsg = "Successfully imported: ";
        const msgParts = [];
        if (sum.states_created > 0) msgParts.push(`${sum.states_created} States`);
        if (sum.districts_created > 0) msgParts.push(`${sum.districts_created} Districts`);
        if (sum.cities_created > 0) msgParts.push(`${sum.cities_created} Cities`);
        if (sum.wards_created > 0) msgParts.push(`${sum.wards_created} Wards`);
        if (sum.vikas_khands_created > 0) msgParts.push(`${sum.vikas_khands_created} Vikas Khands`);
        if (sum.gram_panchayats_created > 0) msgParts.push(`${sum.gram_panchayats_created} Gram Panchayats`);
        if (sum.villages_created > 0) msgParts.push(`${sum.villages_created} Villages`);

        if (msgParts.length > 0) {
          createdMsg += msgParts.join(", ");
        } else {
          createdMsg = "Excel processed, no new location elements were created (already exist).";
        }

        toast.success(createdMsg, { autoClose: 5000 });

        if (res.errors && res.errors.length > 0) {
          res.errors.forEach((err: string) => {
            toast.warn(err, { autoClose: 6000 });
          });
        }

        await fetchAllData();
      } else {
        toast.error("Failed to process Excel upload.");
      }
    } catch (error: any) {
      console.error("Excel upload failed:", error);
      const errMsg = error.response?.data?.detail || error.response?.data?.message || error.message || "Excel upload failed";
      toast.error(errMsg);
    } finally {
      setIsTableLoading(false);
      e.target.value = "";
    }
  };

  // --- CRUD Event Handlers ---

  const handleOpenAdd = () => {
    setFormMode("add");
    setSelectedRowId(null);
    setFormValues(getInitialFormValues(activeTab));
    setIsFormOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setFormMode("edit");
    setSelectedRowId(id);
    const row = getRowById(activeTab, id);
    if (row) {
      setFormValues({ ...row });
      setIsFormOpen(true);
    }
  };

  const handleDeleteTrigger = (id: string) => {
    setSelectedRowId(id);
    setIsDeleteOpen(true);
  };

  const executeDelete = async () => {
    if (!selectedRowId) return;
    setIsDeleting(true);
    try {
      const idNum = Number(selectedRowId);
      let success = true;

      switch (activeTab) {
        case 0:
          await StateService.delete(idNum);
          break;
        case 1:
          await DistrictService.delete(idNum);
          break;
        case 2:
          await CityService.delete(idNum);
          break;
        case 3:
          await WardService.delete(idNum);
          break;
        case 4:
          await VikasKhandService.delete(idNum);
          break;
        case 5:
          await GramPanchayatService.delete(idNum);
          break;
        case 6:
          await VillageService.delete(idNum);
          break;
        case 7:
          setZones((prev) => prev.filter((item) => item.id !== selectedRowId));
          break;
        case 8:
          setOutlets((prev) => prev.filter((item) => item.id !== selectedRowId));
          break;
        case 9:
          setServiceAreas((prev) => prev.filter((item) => item.id !== selectedRowId));
          break;
        case 10:
          setWarehouses((prev) => prev.filter((item) => item.id !== selectedRowId));
          break;
        default:
          success = false;
          break;
      }

      if (success) {
        toast.success("Record deleted successfully!");
        if (activeTab <= 6) {
          await fetchAllData();
        }
      }
    } catch (error: any) {
      console.error("Error deleting record:", error);
      const errMsg = error.response?.data?.detail || error.message || "Failed to delete record";
      toast.error(errMsg);
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
      setSelectedRowId(null);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab <= 6) {
        // Real API Save
        if (formMode === "add") {
          switch (activeTab) {
            case 0: { // State
              await StateService.create({
                state_title: formValues.state_title,
                status: formValues.status || "Active",
              });
              break;
            }
            case 1: { // District
              await DistrictService.create({
                district_title: formValues.district_title,
                state_id: Number(formValues.state_id),
                district_description: formValues.district_description || "",
                district_status: formValues.district_status || "Active",
              });
              break;
            }
            case 2: { // City
              await CityService.create({
                name: formValues.name,
                state_id: Number(formValues.state_id),
                districtid: Number(formValues.districtid),
                description: formValues.description || "",
                status: formValues.status || "Active",
              });
              break;
            }
            case 3: { // Ward
              await WardService.create({
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                city_id: Number(formValues.city_id),
                city_ward_name: formValues.city_ward_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 4: { // Vikas Khand (Block)
              await VikasKhandService.create({
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                vikas_khand_name: formValues.vikas_khand_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 5: { // Gram Panchayat
              await GramPanchayatService.create({
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                vikas_khand_id: Number(formValues.vikas_khand_id),
                panchayat_name: formValues.panchayat_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 6: { // Village
              await VillageService.create({
                district_id: Number(formValues.district_id),
                vikas_khand_id: Number(formValues.vikas_khand_id),
                panchayat_id: Number(formValues.panchayat_id),
                villages_name: formValues.villages_name,
                status: formValues.status || "Active",
              });
              break;
            }
          }
        } else {
          // Edit API Update
          const editId = Number(selectedRowId);
          switch (activeTab) {
            case 0: { // State
              await StateService.update(editId, {
                state_title: formValues.state_title,
                status: formValues.status || "Active",
              });
              break;
            }
            case 1: { // District
              await DistrictService.update(editId, {
                district_title: formValues.district_title,
                state_id: Number(formValues.state_id),
                district_description: formValues.district_description || "",
                district_status: formValues.district_status || "Active",
              });
              break;
            }
            case 2: { // City
              await CityService.update(editId, {
                name: formValues.name,
                state_id: Number(formValues.state_id),
                districtid: Number(formValues.districtid),
                description: formValues.description || "",
                status: formValues.status || "Active",
              });
              break;
            }
            case 3: { // Ward
              await WardService.update(editId, {
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                city_id: Number(formValues.city_id),
                city_ward_name: formValues.city_ward_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 4: { // Vikas Khand (Block)
              await VikasKhandService.update(editId, {
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                vikas_khand_name: formValues.vikas_khand_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 5: { // Gram Panchayat
              await GramPanchayatService.update(editId, {
                state_id: Number(formValues.state_id),
                district_id: Number(formValues.district_id),
                vikas_khand_id: Number(formValues.vikas_khand_id),
                panchayat_name: formValues.panchayat_name,
                status: formValues.status || "Active",
              });
              break;
            }
            case 6: { // Village
              await VillageService.update(editId, {
                district_id: Number(formValues.district_id),
                vikas_khand_id: Number(formValues.vikas_khand_id),
                panchayat_id: Number(formValues.panchayat_id),
                villages_name: formValues.villages_name,
                status: formValues.status || "Active",
              });
              break;
            }
          }
        }
        toast.success("Record saved successfully!");
        await fetchAllData();
      } else {
        // Fallback for mock tabs (7, 8, 9, 10)
        if (formMode === "add") {
          const generatedId = getGeneratedId(activeTab);
          const newRecord = { ...formValues, id: generatedId };
          switch (activeTab) {
            case 7:
              setZones((prev) => [...prev, newRecord]);
              break;
            case 8:
              setOutlets((prev) => [...prev, newRecord]);
              break;
            case 9:
              setServiceAreas((prev) => [...prev, newRecord]);
              break;
            case 10:
              setWarehouses((prev) => [...prev, newRecord]);
              break;
          }
        } else {
          switch (activeTab) {
            case 7:
              setZones((prev) => prev.map((item) => (item.id === selectedRowId ? formValues : item)));
              break;
            case 8:
              setOutlets((prev) => prev.map((item) => (item.id === selectedRowId ? formValues : item)));
              break;
            case 9:
              setServiceAreas((prev) => prev.map((item) => (item.id === selectedRowId ? formValues : item)));
              break;
            case 10:
              setWarehouses((prev) => prev.map((item) => (item.id === selectedRowId ? formValues : item)));
              break;
          }
        }
        toast.success("Record saved successfully!");
      }
      setIsFormOpen(false);
      setSelectedRowId(null);
    } catch (error: any) {
      console.error("Error saving form:", error);
      const errMsg = error.response?.data?.detail || error.message || "Failed to save record";
      toast.error(errMsg);
    }
  };  // --- Helper Functions for Form Handling ---

  const getInitialFormValues = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // States
        return { state_title: "", status: "Active" };
      case 1: // Districts
        return { district_title: "", state_id: "", district_description: "", district_status: "Active" };
      case 2: // Cities
        return { name: "", state_id: "", districtid: "", description: "", status: "Active" };
      case 3: // Wards
        return { city_ward_name: "", state_id: "", district_id: "", city_id: "", status: "Active" };
      case 4: // Vikas Khands
        return { vikas_khand_name: "", state_id: "", district_id: "", status: "Active" };
      case 5: // Gram Panchayats
        return { panchayat_name: "", state_id: "", district_id: "", vikas_khand_id: "", status: "Active" };
      case 6: // Villages
        return { villages_name: "", state_id: "", district_id: "", vikas_khand_id: "", panchayat_id: "", status: "Active" };
      case 7: // Zones
        return { name: "", city: "", slaHours: "", status: "Active" };
      case 8: // Vendor Outlets
        return { storeName: "", vendorName: "", address: "", city: "", phone: "", hours: "", status: "Active" };
      case 9: // Service Areas
        return { areaName: "", pincode: "", minOrder: "", deliveryFee: "", status: "Active" };
      case 10: // Warehouses
        return { hubName: "", manager: "", capacitySqFt: "", phone: "", address: "", status: "Active" };
      default:
        return {};
    }
  };

  const getRowById = (tabIndex: number, id: string) => {
    const idNum = Number(id);
    switch (tabIndex) {
      case 0: return statesList.find((item) => item.state_id === idNum);
      case 1: return districts.find((item) => item.districtid === idNum);
      case 2: return cities.find((item) => item.id === idNum);
      case 3: return wards.find((item) => item.id === idNum);
      case 4: return vikasKhands.find((item) => item.id === idNum);
      case 5: return gramPanchayats.find((item) => item.id === idNum);
      case 6: return villages.find((item) => item.id === idNum);
      case 7: return zones.find((item) => item.id === id);
      case 8: return outlets.find((item) => item.id === id);
      case 9: return serviceAreas.find((item) => item.id === id);
      case 10: return warehouses.find((item) => item.id === id);
      default: return null;
    }
  };

  const getGeneratedId = (tabIndex: number) => {
    const randomNum = String(Math.floor(100 + Math.random() * 900));
    switch (tabIndex) {
      case 0: return `STA-${randomNum}`;
      case 1: return `DST-${randomNum}`;
      case 2: return `CTY-${randomNum}`;
      case 3: return `WRD-${randomNum}`;
      case 4: return `VKD-${randomNum}`;
      case 5: return `GPY-${randomNum}`;
      case 6: return `VIL-${randomNum}`;
      case 7: return `ZON-${randomNum}`;
      case 8: return `OUT-${randomNum}`;
      case 9: return `SER-${randomNum}`;
      case 10: return `WRH-${randomNum}`;
      default: return `LOC-${randomNum}`;
    }
  };

  const getTabLabel = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: return "State";
      case 1: return "District";
      case 2: return "City";
      case 3: return "Ward";
      case 4: return "Vikas Khand";
      case 5: return "Gram Panchayat";
      case 6: return "Village";
      case 7: return "Zone";
      case 8: return "Vendor Outlet";
      case 9: return "Service Area";
      case 10: return "Warehouse Hub";
      default: return "Location";
    }
  };

  // --- Dynamic Summary Metrics computation ---

  const isActiveStatus = (status: any) => {
    if (status === undefined || status === null) return false;
    const str = String(status).toLowerCase();
    return str === "active" || str === "1" || str === "true";
  };

  const isInactiveStatus = (status: any) => {
    if (status === undefined || status === null) return false;
    const str = String(status).toLowerCase();
    return str === "inactive" || str === "suspended" || str === "pending" || str === "0" || str === "false";
  };

  const getTabSummaryData = () => {
    switch (activeTab) {
      case 0:
        return {
          total: statesList.length,
          active: statesList.filter((s) => isActiveStatus(s.status)).length,
          inactive: statesList.filter((s) => isInactiveStatus(s.status)).length,
          labelActive: "Active States",
          labelInactive: "Inactive States",
        };
      case 1:
        return {
          total: districts.length,
          active: districts.filter((d) => isActiveStatus(d.district_status)).length,
          inactive: districts.filter((d) => isInactiveStatus(d.district_status)).length,
          labelActive: "Active Districts",
          labelInactive: "Inactive Districts",
        };
      case 2:
        return {
          total: cities.length,
          active: cities.filter((c) => isActiveStatus(c.status)).length,
          inactive: cities.filter((c) => isInactiveStatus(c.status)).length,
          labelActive: "Active Cities",
          labelInactive: "Inactive Cities",
        };
      case 3:
        return {
          total: wards.length,
          active: wards.filter((w) => isActiveStatus(w.status)).length,
          inactive: wards.filter((w) => isInactiveStatus(w.status)).length,
          labelActive: "Active Wards",
          labelInactive: "Inactive Wards",
        };
      case 4:
        return {
          total: vikasKhands.length,
          active: vikasKhands.filter((vk) => isActiveStatus(vk.status)).length,
          inactive: vikasKhands.filter((vk) => isInactiveStatus(vk.status)).length,
          labelActive: "Active Vikas Khands",
          labelInactive: "Inactive Blocks",
        };
      case 5:
        return {
          total: gramPanchayats.length,
          active: gramPanchayats.filter((gp) => isActiveStatus(gp.status)).length,
          inactive: gramPanchayats.filter((gp) => isInactiveStatus(gp.status)).length,
          labelActive: "Active Panchayats",
          labelInactive: "Inactive Panchayats",
        };
      case 6:
        return {
          total: villages.length,
          active: villages.filter((v) => isActiveStatus(v.status)).length,
          inactive: villages.filter((v) => isInactiveStatus(v.status)).length,
          labelActive: "Active Villages",
          labelInactive: "Inactive Villages",
        };
      case 7:
        return {
          total: zones.length,
          active: zones.filter((z) => z.status === "Active").length,
          inactive: zones.filter((z) => z.status === "Inactive").length,
          labelActive: "Active Zones",
          labelInactive: "Inactive Zones",
        };
      case 8:
        return {
          total: outlets.length,
          active: outlets.filter((o) => o.status === "Active").length,
          inactive: outlets.filter((o) => o.status === "Suspended" || o.status === "Pending").length,
          labelActive: "Active Outlets",
          labelInactive: "Pending/Suspended",
        };
      case 9:
        return {
          total: serviceAreas.length,
          active: serviceAreas.filter((s) => s.status === "Active").length,
          inactive: serviceAreas.filter((s) => s.status === "Inactive").length,
          labelActive: "Active Service Areas",
          labelInactive: "Inactive Areas",
        };
      case 10:
        return {
          total: warehouses.length,
          active: warehouses.filter((w) => w.status === "Active").length,
          inactive: warehouses.filter((w) => w.status === "Maintenance").length,
          labelActive: "Fully Operational",
          labelInactive: "Under Maintenance",
        };
      default:
        return { total: 0, active: 0, inactive: 0, labelActive: "Active", labelInactive: "Inactive" };
    }
  };

  const metrics = getTabSummaryData();

  // --- Dynamic Table Props Resolver ---

  const getTableProps = () => {
    switch (activeTab) {
      case 0:
        return {
          data: statesList,
          columns: stateColumns,
          rowIdField: "state_id",
          searchFields: ["state_title"],
          searchPlaceholder: "Search states by title...",
          minWidth: 800,
        };
      case 1:
        return {
          data: districts,
          columns: districtColumns,
          rowIdField: "districtid",
          searchFields: ["district_title", "state_name"],
          searchPlaceholder: "Search districts by title or state...",
          minWidth: 800,
        };
      case 2:
        return {
          data: cities,
          columns: cityColumns,
          searchFields: ["name", "district_name", "state_name"],
          searchPlaceholder: "Search cities by name, district, state...",
          minWidth: 950,
        };
      case 3:
        return {
          data: wards,
          columns: wardColumns,
          searchFields: ["city_ward_name", "district_name", "state_name"],
          searchPlaceholder: "Search wards by name, district, state...",
          minWidth: 850,
        };
      case 4:
        return {
          data: vikasKhands,
          columns: vikasKhandColumns,
          searchFields: ["vikas_khand_name", "district_name", "state_name"],
          searchPlaceholder: "Search vikas khands by name, district, state...",
          minWidth: 850,
        };
      case 5:
        return {
          data: gramPanchayats,
          columns: gramPanchayatColumns,
          searchFields: ["panchayat_name", "vikas_khand_name", "district_name", "state_name"],
          searchPlaceholder: "Search gram panchayats by name, block, district...",
          minWidth: 800,
        };
      case 6:
        return {
          data: villages,
          columns: villagesColumns,
          searchFields: ["villages_name", "gram_panchayat_name", "vikas_khand_name", "district_name", "state_name"],
          searchPlaceholder: "Search villages by name, GP, block, district...",
          minWidth: 1200,
        };
      case 7:
        return {
          data: zones,
          columns: zoneColumns,
          searchFields: ["name", "city"],
          searchPlaceholder: "Search zones by name or city...",
          minWidth: 800,
        };
      case 8:
        return {
          data: outlets,
          columns: outletColumns,
          searchFields: ["storeName", "vendorName", "address", "city", "phone"],
          searchPlaceholder: "Search outlets by name, merchant, city...",
          minWidth: 1200,
        };
      case 9:
        return {
          data: serviceAreas,
          columns: serviceAreaColumns,
          searchFields: ["areaName", "pincode"],
          searchPlaceholder: "Search service areas by name or code...",
          minWidth: 800,
        };
      case 10:
        return {
          data: warehouses,
          columns: warehouseColumns,
          searchFields: ["hubName", "manager", "phone", "address"],
          searchPlaceholder: "Search warehouses by hub, manager, city...",
          minWidth: 1100,
        };
      default:
        return { data: [], columns: [], searchFields: [], minWidth: 800 };
    }
  };

  const currentTableProps = getTableProps();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      {/* Breadcrumbs */}
      <AdminBreadcrumbs />

      {/* Overview stats metrics row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#757575", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                Total Registered {getTabLabel(activeTab)}s
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#111827", mt: 0.5 }}>
                {metrics.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#137333", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                {metrics.labelActive}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#137333", mt: 0.5 }}>
                {metrics.active}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#C5221F", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                {metrics.labelInactive}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#C5221F", mt: 0.5 }}>
                {metrics.inactive}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Container */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #EAEAEA",
          p: 1.5,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="locations sub navigation tabs"
          sx={{
            minHeight: "48px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#635BFF",
              height: "3px",
              borderRadius: "3px",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: "#5C6B73",
              px: 3,
              py: 1.5,
              minHeight: "48px",
              transition: "all 0.2s ease",
              "&.Mui-selected": {
                color: "#635BFF",
                fontWeight: 600,
              },
              "&:hover": {
                color: "#635BFF",
                opacity: 0.8,
              },
            },
          }}
        >

          <Tab icon={<MapIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="States" />
          <Tab icon={<CorporateFareIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Districts" />
          <Tab icon={<LocationCityIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Cities" />
          <Tab icon={<PinDropIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Wards" />
          <Tab icon={<DomainIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Vikas Khands" />
          <Tab icon={<HomeWorkIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Gram Panchayats" />
          <Tab icon={<HolidayVillageIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Villages" />
          <Tab icon={<ExploreIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Zones" />
          <Tab icon={<StorefrontIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Vendor Outlets" />
          <Tab icon={<LocalShippingIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Service Areas" />
          <Tab icon={<WarehouseIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Warehouses" />
        </Tabs>
      </Box>

      {/* Main Datatable Container */}
      <CustomDataTable
        data={currentTableProps.data}
        columns={currentTableProps.columns}
        searchFields={currentTableProps.searchFields}
        searchPlaceholder={currentTableProps.searchPlaceholder}
        rowIdField={currentTableProps.rowIdField}
        actions={["edit", "delete"]}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteTrigger}
        minWidth={currentTableProps.minWidth}
        loading={isTableLoading}
        toolbarActions={
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              onClick={handleDownloadSample}
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: "#635BFF",
                color: "#635BFF",
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 600,
                px: 2,
                py: 1,
                "&:hover": { borderColor: "#4F46E5", backgroundColor: "rgba(99, 91, 255, 0.04)" },
              }}
            >
              Sample Excel
            </Button>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{
                borderColor: "#10B981",
                color: "#10B981",
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 600,
                px: 2,
                py: 1,
                "&:hover": { borderColor: "#059669", backgroundColor: "rgba(16, 185, 129, 0.04)" },
              }}
            >
              Upload Excel
              <input
                type="file"
                hidden
                accept=".xlsx, .xls"
                onChange={handleUploadExcel}
              />
            </Button>
            <Button
              onClick={handleOpenAdd}
              variant="contained"
              sx={{
                backgroundColor: "#635BFF",
                color: "#FFFFFF",
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: 600,
                px: 3,
                py: 1,
                width: "auto",
                "&:hover": { backgroundColor: "#4F46E5" },
              }}
            >
              Add New {getTabLabel(activeTab)}
            </Button>
          </Box>
        }
      />

      {/* Unified Add/Edit Dialog Form Modal */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111827", pb: 1 }}>
          {formMode === "add" ? "Add New" : "Edit"} {getTabLabel(activeTab)}
        </DialogTitle>
        <DialogContent dividers sx={{ borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA", py: 3 }}>
          <Box component="form" onSubmit={handleSaveForm} id="location-crud-form">
            <Grid container spacing={2.5}>
              {/* States Form Fields */}
              {activeTab === 0 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="State Name"
                      placeholder="e.g. Chhattisgarh"
                      value={formValues.state_title || ""}
                      onChange={(e) => setFormValues({ ...formValues, state_title: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Districts Form Fields */}
              {activeTab === 1 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="District Name"
                      placeholder="e.g. Korba"
                      value={formValues.district_title || ""}
                      onChange={(e) => setFormValues({ ...formValues, district_title: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value) })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="District Description"
                      placeholder="e.g. Korba District details"
                      value={formValues.district_description || ""}
                      onChange={(e) => setFormValues({ ...formValues, district_description: e.target.value })}
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.district_status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, district_status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Cities Form Fields */}
              {activeTab === 2 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="City Name"
                      placeholder="e.g. Gevra"
                      value={formValues.name || ""}
                      onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value), districtid: "" })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>District Association</InputLabel>
                      <Select
                        value={formValues.districtid !== undefined && formValues.districtid !== "" ? Number(formValues.districtid) : ""}
                        label="District Association"
                        onChange={(e) => setFormValues({ ...formValues, districtid: Number(e.target.value) })}
                        disabled={!formValues.state_id}
                        required
                      >
                        {districts
                          .filter((d) => Number(d.state_id) === Number(formValues.state_id))
                          .map((dst) => (
                            <MenuItem key={dst.districtid} value={dst.districtid}>{dst.district_title}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="e.g. Gevra details"
                      value={formValues.description || ""}
                      onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Wards Form Fields */}
              {activeTab === 3 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Ward Name"
                      placeholder="e.g. Gevra Ward"
                      value={formValues.city_ward_name || ""}
                      onChange={(e) => setFormValues({ ...formValues, city_ward_name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value), district_id: "", city_id: "" })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>District Association</InputLabel>
                      <Select
                        value={formValues.district_id !== undefined && formValues.district_id !== "" ? Number(formValues.district_id) : ""}
                        label="District Association"
                        onChange={(e) => setFormValues({ ...formValues, district_id: Number(e.target.value), city_id: "" })}
                        disabled={!formValues.state_id}
                        required
                      >
                        {districts
                          .filter((d) => Number(d.state_id) === Number(formValues.state_id))
                          .map((dst) => (
                            <MenuItem key={dst.districtid} value={dst.districtid}>{dst.district_title}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>City Association</InputLabel>
                      <Select
                        value={formValues.city_id !== undefined && formValues.city_id !== "" ? Number(formValues.city_id) : ""}
                        label="City Association"
                        onChange={(e) => setFormValues({ ...formValues, city_id: Number(e.target.value) })}
                        disabled={!formValues.district_id}
                        required
                      >
                        {cities
                          .filter((c) => Number(c.districtid) === Number(formValues.district_id) && Number(c.state_id) === Number(formValues.state_id))
                          .map((ct) => (
                            <MenuItem key={ct.id} value={ct.id}>{ct.name}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Vikas Khands Form Fields */}
              {activeTab === 4 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Vikas Khand (Block) Name"
                      placeholder="e.g. Korba vikas-khand"
                      value={formValues.vikas_khand_name || ""}
                      onChange={(e) => setFormValues({ ...formValues, vikas_khand_name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value), district_id: "" })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>District Association</InputLabel>
                      <Select
                        value={formValues.district_id !== undefined && formValues.district_id !== "" ? Number(formValues.district_id) : ""}
                        label="District Association"
                        onChange={(e) => setFormValues({ ...formValues, district_id: Number(e.target.value) })}
                        disabled={!formValues.state_id}
                        required
                      >
                        {districts
                          .filter((d) => Number(d.state_id) === Number(formValues.state_id))
                          .map((dst) => (
                            <MenuItem key={dst.districtid} value={dst.districtid}>{dst.district_title}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Gram Panchayats Form Fields */}
              {activeTab === 5 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Gram Panchayat Name"
                      placeholder="e.g. panchayat korba"
                      value={formValues.panchayat_name || ""}
                      onChange={(e) => setFormValues({ ...formValues, panchayat_name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value), district_id: "", vikas_khand_id: "" })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>District Association</InputLabel>
                      <Select
                        value={formValues.district_id !== undefined && formValues.district_id !== "" ? Number(formValues.district_id) : ""}
                        label="District Association"
                        onChange={(e) => setFormValues({ ...formValues, district_id: Number(e.target.value), vikas_khand_id: "" })}
                        disabled={!formValues.state_id}
                        required
                      >
                        {districts
                          .filter((d) => Number(d.state_id) === Number(formValues.state_id))
                          .map((dst) => (
                            <MenuItem key={dst.districtid} value={dst.districtid}>{dst.district_title}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Vikas Khand (Block) Association</InputLabel>
                      <Select
                        value={formValues.vikas_khand_id !== undefined && formValues.vikas_khand_id !== "" ? Number(formValues.vikas_khand_id) : ""}
                        label="Vikas Khand (Block) Association"
                        onChange={(e) => setFormValues({ ...formValues, vikas_khand_id: Number(e.target.value) })}
                        disabled={!formValues.district_id}
                        required
                      >
                        {vikasKhands
                          .filter((vk) => Number(vk.district_id) === Number(formValues.district_id) && Number(vk.state_id) === Number(formValues.state_id))
                          .map((vk) => (
                            <MenuItem key={vk.id} value={vk.id}>{vk.vikas_khand_name}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Villages Form Fields */}
              {activeTab === 6 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Village Name"
                      placeholder="e.g. Korba"
                      value={formValues.villages_name || ""}
                      onChange={(e) => setFormValues({ ...formValues, villages_name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>State Association</InputLabel>
                      <Select
                        value={formValues.state_id !== undefined && formValues.state_id !== "" ? Number(formValues.state_id) : ""}
                        label="State Association"
                        onChange={(e) => setFormValues({ ...formValues, state_id: Number(e.target.value), district_id: "", vikas_khand_id: "", panchayat_id: "" })}
                        required
                      >
                        {statesList.map((st) => (
                          <MenuItem key={st.state_id} value={st.state_id}>{st.state_title}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>District Association</InputLabel>
                      <Select
                        value={formValues.district_id !== undefined && formValues.district_id !== "" ? Number(formValues.district_id) : ""}
                        label="District Association"
                        onChange={(e) => setFormValues({ ...formValues, district_id: Number(e.target.value), vikas_khand_id: "", panchayat_id: "" })}
                        disabled={!formValues.state_id}
                        required
                      >
                        {districts
                          .filter((d) => Number(d.state_id) === Number(formValues.state_id))
                          .map((dst) => (
                            <MenuItem key={dst.districtid} value={dst.districtid}>{dst.district_title}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Vikas Khand (Block) Association</InputLabel>
                      <Select
                        value={formValues.vikas_khand_id !== undefined && formValues.vikas_khand_id !== "" ? Number(formValues.vikas_khand_id) : ""}
                        label="Vikas Khand (Block) Association"
                        onChange={(e) => setFormValues({ ...formValues, vikas_khand_id: Number(e.target.value), panchayat_id: "" })}
                        disabled={!formValues.district_id}
                        required
                      >
                        {vikasKhands
                          .filter((vk) => Number(vk.district_id) === Number(formValues.district_id) && Number(vk.state_id) === Number(formValues.state_id))
                          .map((vk) => (
                            <MenuItem key={vk.id} value={vk.id}>{vk.vikas_khand_name}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Gram Panchayat Association</InputLabel>
                      <Select
                        value={formValues.panchayat_id !== undefined && formValues.panchayat_id !== "" ? Number(formValues.panchayat_id) : ""}
                        label="Gram Panchayat Association"
                        onChange={(e) => setFormValues({ ...formValues, panchayat_id: Number(e.target.value) })}
                        disabled={!formValues.vikas_khand_id}
                        required
                      >
                        {gramPanchayats
                          .filter((gp) => Number(gp.vikas_khand_id) === Number(formValues.vikas_khand_id) && Number(gp.district_id) === Number(formValues.district_id))
                          .map((gp) => (
                            <MenuItem key={gp.id} value={gp.id}>{gp.panchayat_name}</MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Zones Form Fields */}
              {activeTab === 7 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Zone Name"
                      placeholder="e.g. Downtown SF"
                      value={formValues.name || ""}
                      onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="City Associated"
                      placeholder="e.g. San Francisco"
                      value={formValues.city || ""}
                      onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="SLA Delivery Delay (Hours)"
                      placeholder="e.g. 3"
                      value={formValues.slaHours || ""}
                      onChange={(e) => setFormValues({ ...formValues, slaHours: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Outlets Form Fields */}
              {activeTab === 8 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Store / Outlet Name"
                      placeholder="e.g. Fresh Mart Downtown"
                      value={formValues.storeName || ""}
                      onChange={(e) => setFormValues({ ...formValues, storeName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Vendor / Merchant Owner"
                      placeholder="e.g. John Doe"
                      value={formValues.vendorName || ""}
                      onChange={(e) => setFormValues({ ...formValues, vendorName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      placeholder="e.g. +1 (555) 123-4567"
                      value={formValues.phone || ""}
                      onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Operating Hours"
                      placeholder="e.g. 08:00 AM - 10:00 PM"
                      value={formValues.hours || ""}
                      onChange={(e) => setFormValues({ ...formValues, hours: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Full Address Line"
                      placeholder="e.g. 123 Main St"
                      value={formValues.address || ""}
                      onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="City"
                      placeholder="e.g. San Francisco"
                      value={formValues.city || ""}
                      onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Suspended">Suspended</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Service Areas Form Fields */}
              {activeTab === 9 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Area Name"
                      placeholder="e.g. SF Core Delivery"
                      value={formValues.areaName || ""}
                      onChange={(e) => setFormValues({ ...formValues, areaName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Zip / Pin Code"
                      placeholder="e.g. 94102"
                      value={formValues.pincode || ""}
                      onChange={(e) => setFormValues({ ...formValues, pincode: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Min Order Amount (₹)"
                      placeholder="e.g. 400"
                      value={formValues.minOrder || ""}
                      onChange={(e) => setFormValues({ ...formValues, minOrder: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Base Delivery Fee (₹)"
                      placeholder="e.g. 35"
                      value={formValues.deliveryFee || ""}
                      onChange={(e) => setFormValues({ ...formValues, deliveryFee: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Warehouses Form Fields */}
              {activeTab === 10 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Hub Name"
                      placeholder="e.g. SF Central Warehouse"
                      value={formValues.hubName || ""}
                      onChange={(e) => setFormValues({ ...formValues, hubName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Manager Name"
                      placeholder="e.g. Mark Vance"
                      value={formValues.manager || ""}
                      onChange={(e) => setFormValues({ ...formValues, manager: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Capacity (sq ft)"
                      placeholder="e.g. 50000"
                      value={formValues.capacitySqFt || ""}
                      onChange={(e) => setFormValues({ ...formValues, capacitySqFt: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      placeholder="e.g. +1 (555) 444-5555"
                      value={formValues.phone || ""}
                      onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Full Address Line"
                      placeholder="e.g. 100 Logistics Blvd"
                      value={formValues.address || ""}
                      onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status || "Active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={() => setIsFormOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              color: "#374151",
              borderColor: "#D1D5DB",
              "&:hover": { borderColor: "#9CA3AF" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="location-crud-form"
            variant="contained"
            sx={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            Save Record
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedRowId(null);
        }}
        onConfirm={executeDelete}
        loading={isDeleting}
      />
    </Box>
  );
}
