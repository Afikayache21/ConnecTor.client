export function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    };
  
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-GB', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-GB', optionsTime).format(date);
  
    return `${formattedDate} - ${formattedTime}`;
  }

  export function formatDateWithDateTime(date: Date) {
  
    // Options for formatting the date
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',  // Full year
    };
  
    // Options for formatting the time
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // Include seconds if needed
      hour12: false, // Use 24-hour format
    };
  
    // Format date and time
    const formattedDate = new Intl.DateTimeFormat('en-GB', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-GB', optionsTime).format(date);
  
    // Return formatted date and time
    return `${formattedDate} ${formattedTime}`;
  }
  
  