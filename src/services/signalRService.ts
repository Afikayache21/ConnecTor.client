// src/SignalRService.ts

import * as signalR from '@microsoft/signalr';

class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    // // Initialize the SignalR connection

    const customData = encodeURIComponent(localStorage.getItem('userId') || '');
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(`https://localhost:5000/hubs/ChatHub?customData=${customData}`) // Update the URL to match your backend
      .withAutomaticReconnect()
      .build();      

    this.connection.onclose(this.onConnectionClose);
  }

  // Start the SignalR connection
  public startConnection = async (): Promise<void> => {
    try {
      await this.connection.start();
      console.log('Connected to SignalR hub');
    } catch (err) {
      console.error('Error connecting to SignalR hub:', err);
      setTimeout(this.startConnection, 5000); // Retry after 5 seconds
    }
  };

  // Stop the SignalR connection
  public stopConnection = async (): Promise<void> => {
    try {
      await this.connection.stop();
      console.log('Disconnected from SignalR hub');
    } catch (err) {
      console.error('Error disconnecting from SignalR hub:', err);
    }
  };

  // Reconnection logic when the connection is closed
  private onConnectionClose = (): void => {
    console.warn('SignalR connection closed. Reconnecting...');
    this.startConnection();
  };

  // Subscribe to the ReceiveMessage event
  public onMessageReceived = (callback: (message: string) => void): void => {
   console.log("message before: ")
    this.connection.on('ReceiveMessage', callback);

  };

  // Unsubscribe from the ReceiveMessage event
  public offMessageReceived = (): void => {
    this.connection.off('ReceiveMessage');
  };


  public onNotificationReceived = (callback: (message: string) => void): void => {
    console.log("Notification before: ")
     this.connection.on('ReceiveNotification', callback);
 
   };
 
   // Unsubscribe from the ReceiveMessage event
   public offNotificationReceived = (): void => {
     this.connection.off('ReceiveNotification');
   };

}

export default new SignalRService();
