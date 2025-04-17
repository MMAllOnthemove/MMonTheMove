// Define a flat list of faults
const faults_hhp = [
    { value: "Cracked Screen", label: "Cracked Screen" },
    { value: "Broken Glass", label: "Broken Glass" },
    { value: "Touchscreen Malfunction", label: "Touchscreen Malfunction" },
    { value: "Unresponsive Touch", label: "Unresponsive Touch" },
    { value: "Dead Pixels", label: "Dead Pixels" },
    { value: "Flickering Screen", label: "Flickering Screen" },
    { value: "Screen Burn-in", label: "Screen Burn-in" },
    { value: "Color Distortion", label: "Color Distortion" },
    {
        value: "Broken or Flickering AMOLED Panel",
        label: "Broken or Flickering AMOLED Panel",
    },
    {
        value: "Display Lines or Artifacts",
        label: "Display Lines or Artifacts",
    },
    { value: "Black Screen", label: "Black Screen" },
    {
        value: "Screen Bleeding",
        label: "Screen Bleeding (e.g., light leaking around edges)",
    },
    { value: "Brightness Issues", label: "Brightness Issues" },
    { value: "Display Dead Zones", label: "Display Dead Zones" },
    {
        value: "Cracked or Dislodged Digitizer",
        label: "Cracked or Dislodged Digitizer",
    },
    { value: "Battery Not Charging", label: "Battery Not Charging" },
    { value: "Fast Draining Battery", label: "Fast Draining Battery" },
    {
        value: "Battery Swelling or Expansion",
        label: "Battery Swelling or Expansion",
    },
    {
        value: "Overheating While Charging",
        label: "Overheating While Charging",
    },
    {
        value: "No power",
        label: "No power",
    },
    { value: "Charging Port Damage", label: "Charging Port Damage" },
    { value: "Forgot password", label: "Forgot password" },
    {
        value: "Wireless Charging Not Working",
        label: "Wireless Charging Not Working",
    },
    {
        value: "Battery Not Holding Charge",
        label: "Battery Not Holding Charge",
    },
    {
        value: "Inconsistent Charging Speed",
        label: "Inconsistent Charging Speed",
    },
    {
        value: "Phone Turning Off Unexpectedly",
        label: "Phone Turning Off Unexpectedly",
    },
    { value: "Slow Charging", label: "Slow Charging" },
    { value: "Charging Cable Failure", label: "Charging Cable Failure" },
    { value: "No Sound from Speakers", label: "No Sound from Speakers" },
    {
        value: "Distorted Sound from Speakers",
        label: "Distorted Sound from Speakers",
    },
    { value: "Microphone Not Working", label: "Microphone Not Working" },
    { value: "Audio Cutting In and Out", label: "Audio Cutting In and Out" },
    { value: "Call Audio Issues", label: "Call Audio Issues" },
    { value: "Headphone Jack Issues", label: "Headphone Jack Issues" },
    { value: "Bluetooth Audio Problems", label: "Bluetooth Audio Problems" },
    {
        value: "Speakers Not Responding to Volume Changes",
        label: "Speakers Not Responding to Volume Changes",
    },
    {
        value: "Camera Lens Cracked or Scratched",
        label: "Camera Lens Cracked or Scratched",
    },
    { value: "Camera Not Focusing", label: "Camera Not Focusing" },
    { value: "Blurred Photos", label: "Blurred Photos" },
    {
        value: "Poor Low-light Performance",
        label: "Poor Low-light Performance",
    },
    {
        value: "Black or Blank Camera Screen",
        label: "Black or Blank Camera Screen",
    },
    {
        value: "Shutter Button Not Responding",
        label: "Shutter Button Not Responding",
    },
    {
        value: "Camera App Crashing or Freezing",
        label: "Camera App Crashing or Freezing",
    },
    { value: "Flash Not Working", label: "Flash Not Working" },
    {
        value: "Front or Rear Camera Malfunction",
        label: "Front or Rear Camera Malfunction",
    },
    {
        value: "Overheating When Using Camera",
        label: "Overheating When Using Camera",
    },
    { value: "Water Damage to Camera", label: "Water Damage to Camera" },
    { value: "Phone Freezing or Lagging", label: "Phone Freezing or Lagging" },
    { value: "App Crashes", label: "App Crashes" },
    { value: "Phone Stuck in Boot Loop", label: "Phone Stuck in Boot Loop" },
    { value: "System Update Failures", label: "System Update Failures" },
    {
        value: "Wi-Fi or Cellular Connectivity Problems",
        label: "Wi-Fi or Cellular Connectivity Problems",
    },
    {
        value: "Slow Performance or Unresponsiveness",
        label: "Slow Performance or Unresponsiveness",
    },
    {
        value: "Unresponsive Touchscreen After Software Update",
        label: "Unresponsive Touchscreen After Software Update",
    },
    {
        value: "Bluetooth Connectivity Problems",
        label: "Bluetooth Connectivity Problems",
    },
    { value: "OS Not Booting Up", label: "OS Not Booting Up" },
    {
        value: "Device Not Responding to Fingerprint or Face Recognition",
        label: "Device Not Responding to Fingerprint or Face Recognition",
    },
    { value: "Weak or No Wi-Fi Signal", label: "Weak or No Wi-Fi Signal" },
    {
        value: "No Cellular Network/Signal",
        label: "No Cellular Network/Signal",
    },
    { value: "Dropped Calls", label: "Dropped Calls" },
    { value: "SIM Card Not Detected", label: "SIM Card Not Detected" },
    { value: "No Internet Connection", label: "No Internet Connection" },
    { value: "Bluetooth Not Pairing", label: "Bluetooth Not Pairing" },
    { value: "GPS Not Working", label: "GPS Not Working" },
    { value: "Mobile Data Not Working", label: "Mobile Data Not Working" },
    { value: "Airplane Mode Stuck On", label: "Airplane Mode Stuck On" },
    { value: "Install screen protector", label: "Install screen protector" },
    { value: "Water Damage", label: "Water Damage" },
    { value: "Dropped or Impact Damage", label: "Dropped or Impact Damage" },
    { value: "Button Malfunctions", label: "Button Malfunctions" },
    { value: "Frame or Chassis Damage", label: "Frame or Chassis Damage" },
    { value: "Cracked Back Glass", label: "Cracked Back Glass" },
    { value: "Bent or Warped Body", label: "Bent or Warped Body" },
    {
        value: "Damage from Extreme Temperatures",
        label: "Damage from Extreme Temperatures",
    },
    { value: "Overheating", label: "Overheating" },
    { value: "Slow Processing/Freezing", label: "Slow Processing/Freezing" },
    { value: "Faulty RAM or Storage", label: "Faulty RAM or Storage" },
    {
        value: "Unresponsive Home Button or Volume Buttons",
        label: "Unresponsive Home Button or Volume Buttons",
    },
    { value: "Power Button Malfunction", label: "Power Button Malfunction" },
    { value: "Vibration Not Working", label: "Vibration Not Working" },
    { value: "Fingerprint Sensor Issues", label: "Fingerprint Sensor Issues" },
    {
        value: "Face Recognition Not Working",
        label: "Face Recognition Not Working",
    },
    { value: "Sensors Not Responding", label: "Sensors Not Responding" },
    {
        value: "App Not Installing or Updating",
        label: "App Not Installing or Updating",
    },
    { value: "Phone Not Turning On", label: "Phone Not Turning On" },
    { value: "Phone Restarting Randomly", label: "Phone Restarting Randomly" },
    {
        value: "Phone Not Recognized by Computer",
        label: "Phone Not Recognized by Computer",
    },
    {
        value: "Touchscreen Showing Ghost Touches",
        label: "Touchscreen Showing Ghost Touches",
    },
    {
        value: "Software/Hardware Compatibility Issues",
        label: "Software/Hardware Compatibility Issues",
    },
    { value: "Wi-Fi Calling Not Working", label: "Wi-Fi Calling Not Working" },
    {
        value: "Bluetooth Device Disconnecting",
        label: "Bluetooth Device Disconnecting",
    },
];


export default faults_hhp