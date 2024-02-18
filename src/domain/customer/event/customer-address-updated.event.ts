import EventInterface from "../../@shared/event/event.interface";
import CustomerAddressUpdatedEventData from "./customer-address-updated.event.data";

export default class CustomerAddressUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressUpdatedEventData;

  constructor(eventData: CustomerAddressUpdatedEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
