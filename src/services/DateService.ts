function formatDate(dateString: string) {
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
  export { formatDate}