import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class LogCustomerNewAddressWhenItsUpdatedHandler
  implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log(event);
    const { id, name, address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.street} - ${address.number} - ${address.zip}, ${address.city}`); 
  }
}