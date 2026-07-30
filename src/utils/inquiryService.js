// Local storage database utility for inquiry forms
const STORAGE_KEY = 'noble_education_inquiries';

// OPTIONAL: Paste your Google Apps Script Web App URL here to sync inquiries to Google Sheets in real-time!
const GOOGLE_SHEET_WEBHOOK_URL = "";

export const inquiryService = {
  // Get all submitted inquiries
  getInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading inquiries from localStorage", e);
      return [];
    }
  },

  // Alias for sendInquiry
  sendInquiry(inquiry) {
    return this.saveInquiry(inquiry);
  },

  // Save a new inquiry submission
  saveInquiry(inquiry) {
    try {
      const current = this.getInquiries();
      const formSource = inquiry.formSource || inquiry.formType || (inquiry.school ? `School Form (${inquiry.school})` : 'General Admission Form');
      
      const newInquiry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
        formSource,
        ...inquiry
      };
      const updated = [newInquiry, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Real-time Sync with Google Sheets Webhook
      if (GOOGLE_SHEET_WEBHOOK_URL) {
        fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newInquiry)
        }).catch(err => console.error("Google Sheets sync failed", err));
      }

      return true;
    } catch (e) {
      console.error("Error saving inquiry to localStorage", e);
      return false;
    }
  },

  // Download inquiries as an Excel-compatible CSV file (supports filtered lists)
  downloadExcel(customInquiries) {
    const inquiries = customInquiries || this.getInquiries();
    if (!inquiries || inquiries.length === 0) {
      alert("No inquiries recorded yet to export!");
      return;
    }

    // Define CSV Headers
    const headers = ["Timestamp", "Form Origin / Source", "Full Name", "Contact Number", "Interested Program", "Message / Query Details"];
    
    // Map data rows
    const rows = inquiries.map(item => [
      item.timestamp || '',
      item.formSource || (item.school ? `School Form (${item.school})` : 'General Admission Form'),
      item.name || '',
      item.phone || '',
      item.program || '',
      (item.message || '').replace(/"/g, '""') // Escape quotes for CSV
    ]);

    // Construct CSV content with BOM for proper Excel encoding
    let csvContent = "\uFEFF";
    csvContent += headers.map(h => `"${h}"`).join(",") + "\r\n";
    
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\r\n";
    });

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Noble_Education_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
