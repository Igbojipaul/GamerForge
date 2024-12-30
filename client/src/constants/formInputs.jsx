export const productForm = [
  {
    label: "Product Name",
    type: "text",
    name: "name",
    placeholder: "Enter product name",
    required: true,
  },
  {
    label: "Description",
    type: "textarea",
    name: "description",
    placeholder: "Enter product description",
    rows: 5,
    required: true,
  },
  {
    label: "Price",
    type: "number",
    name: "price",
    placeholder: "Enter product price",
    required: true,
  },
  {
    label: "Category",
    type: "select",
    name: "category",
    options: [
      { label: "Gaming Peripherals", value: "gamingPeripherals" },
      { label: "Consoles & Accessories", value: "consoles&Accessories" },
      { label: "PC Hardware", value: "pcHardware" },
      { label: "Gaming Chairs & Desks", value: "gamingChairs&Desks" },
      { label: "Monitors & Displays", value: "monitors&Displays" },
      { label: "Streaming Gear", value: "streamingGear" },
      { label: "Virtual Reality (VR) Gear", value: "virtualReality" },
      {
        label: "Gaming Apparel & Merchandise",
        value: "gamingApparel&merchandise",
      },
      { label: "Network & Connectivity", value: "network&Connectivity" },
      {
        label: "Software & Digital Products",
        value: "Software&DigitalProducts",
      },
    ],
    required: true,
  },
  {
    label: "Brand",
    type: "select",
    name: "brand",
    options: [
      { label: "Logitech", value: "logitech" },
      { label: "Razer", value: "razer" },
      { label: "Corsair", value: "corsair" },
      { label: "SteelSeries", value: "steelseries" },
      { label: "HyperX", value: "hyperx" },
      { label: "Zowie", value: "zowie" },
      { label: "ROCCAT", value: "roccat" },
      { label: "Cooler Master", value: "coolermaster" },
      { label: "ASUS ROG", value: "asusrog" },
      { label: "Turtle Beach", value: "turtlebeach" },
      { label: "Glorious PC Gaming Race", value: "gloriouspcgamingrace" },
      { label: "Elgato", value: "elgato" },
      { label: "Mad Catz", value: "madcatz" },
      { label: "Cougar", value: "cougar" },
      { label: "Redragon", value: "redragon" },
      { label: "NVIDIA", value: "nvidia" },
      { label: "AMD", value: "amd" },
      { label: "Intel", value: "intel" },
      { label: "MSI", value: "msi" },
      { label: "Gigabyte", value: "gigabyte" },
      { label: "EVGA", value: "evga" },
      { label: "Kingston", value: "kingston" },
      { label: "Western Digital", value: "westerndigital" },
      { label: "Seagate", value: "seagate" },
      { label: "NZXT", value: "nzxt" },
      { label: "Thermaltake", value: "thermaltake" },
      { label: "Be Quiet!", value: "bequiet" },
      { label: "AORUS", value: "aorus" },
      { label: "Secretlab", value: "secretlab" },
      { label: "DXRacer", value: "dxracer" },
      { label: "Noblechairs", value: "noblechairs" },
      { label: "AKRacing", value: "akracing" },
      { label: "AndaSeat", value: "andaseat" },
      { label: "Vertagear", value: "vertagear" },
      { label: "RESPAWN", value: "respawn" },
      { label: "Arozzi", value: "arozzi" },
      { label: "E-Win", value: "ewin" },
      { label: "Sony PlayStation", value: "sonyplaystation" },
      { label: "Microsoft Xbox", value: "microsoftxbox" },
      { label: "Nintendo", value: "nintendo" },
      { label: "8BitDo", value: "8bitdo" },
      { label: "SCUF Gaming", value: "scufgaming" },
      { label: "PDP Gaming", value: "pdpgaming" },
      { label: "PowerA", value: "powera" },
      { label: "Hori", value: "hori" },
      { label: "Alienware", value: "alienware" },
      { label: "Acer", value: "acer" },
      { label: "BenQ", value: "benq" },
      { label: "LG", value: "lg" },
      { label: "Samsung", value: "samsung" },
      { label: "ViewSonic", value: "viewsonic" },
      { label: "Dell", value: "dell" },
      { label: "Oculus (Meta)", value: "oculus" },
      { label: "HTC Vive", value: "htcvive" },
      { label: "Sony PlayStation VR", value: "sonyplaystationvr" },
      { label: "Valve Index", value: "valveindex" },
      { label: "Pico Interactive", value: "picointeractive" },
      { label: "HP Reverb", value: "hpreverb" },
      { label: "Netgear", value: "netgear" },
      { label: "TP-Link", value: "tplink" },
      { label: "Ubiquiti Networks", value: "ubiquiti" },
      { label: "Linksys", value: "linksys" },
      { label: "D-Link", value: "dlink" },
    ],

    required: true,
  },

  {
    label: "Sale Price",
    type: "number",
    name: "saleprice",
    placeholder: "Enter sale Price(optional)",
    required: false,
  },
  {
    label: "Stock",
    type: "number",
    name: "stock",
    placeholder: "Enter stock quantity",
    required: true,
  },
];

export const getLabelByValue = (option, value) => {
  if (option === "category" && value.length) {
    const field = productForm[3];
    const label = field.options.find((opt) => opt.value === value).label;

    return label;
  } else {
    if (value.length) {
      const field = productForm[4];
      const label = field.options.find((opt) => opt.value === value).label;

      return label;
    }
  }
};

// address

export const addressForm = [
  {
    label: "Address Label",
    type: "select",
    name: "label",
    options: [
      { label: "Home", value: "home" },
      { label: "Office", value: "office" },
      { label: "Other", value: "other" },
    ],
    placeholder: "Select label",
    required: true,
  },
  {
    label: "Address Line 1",
    type: "text",
    name: "addressLine1",
    placeholder: "Enter primary address",
    required: true,
  },
  {
    label: "Address Line 2",
    type: "text",
    name: "addressLine2",
    placeholder: "Enter secondary address (optional)",
    required: false,
  },
  {
    label: "City",
    type: "text",
    name: "city",
    placeholder: "Enter city",
    required: true,
  },
  {
    label: "State",
    type: "text",
    name: "state",
    placeholder: "Enter state/province",
    required: true,
  },
  {
    label: "Postal Code",
    type: "text",
    name: "postalCode",
    placeholder: "Enter postal code",
    required: true,
  },
  {
    label: "Country",
    type: "text",
    name: "country",
    placeholder: "Enter country",
    required: true,
  },
  {
    label: "Phone Number",
    type: "tel",
    name: "phone",
    placeholder: "Enter phone number",
    required: true,
  },
  {
    label: "Set as Default Address",
    type: "checkbox",
    name: "isDefault",
    required: false,
  },
];
