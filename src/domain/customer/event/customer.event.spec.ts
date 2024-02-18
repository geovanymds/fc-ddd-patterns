import LogFirstWhenCustomerIsCreatedHandler from "./handler/log-first-when-customer-is-created.handler";
import LogSecondWhenCustomerIsCreatedHandler from "./handler/log-second-when-customer-is-created.handler";
import LogCustomerNewAddressWhenItsUpdatedHandler from "./handler/log-customer-new-address-when-its-updated.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe("Customer events tests", () => {

  it("should log 'Esse é o primeiro console.log do evento: CustomerCreated'", () => {
    const eventHandler = new LogFirstWhenCustomerIsCreatedHandler();
    const spyeventHandler = jest.spyOn(console, "log");

    const event = new CustomerCreatedEvent({
      name: "Customer name",
      rewardPoints: 15,
      address: {
        street: "any street",
        number: 10,
        zip: "any zip",
        city: "any city"
      }
    });

    eventHandler.handle(event);

    expect(spyeventHandler).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
  });

  it("should log 'Esse é o segundo console.log do evento: CustomerCreated'", () => {
    const eventHandler = new LogSecondWhenCustomerIsCreatedHandler();
    const spyeventHandler = jest.spyOn(console, "log");

    const event = new CustomerCreatedEvent({
      name: "Customer name",
      rewardPoints: 15,
      address: {
        street: "any street",
        number: 10,
        zip: "any zip",
        city: "any city"
      }
    });

    eventHandler.handle(event);
    expect(spyeventHandler).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
  });

  it("should log customer and new customer address data", () => {
    const eventHandler = new LogCustomerNewAddressWhenItsUpdatedHandler();
    const spyeventHandler = jest.spyOn(console, "log");

    const eventData = {
      id: "123",
      name: "Customer name",
      address: {
        street: "any street",
        number: 10,
        zip: "any zip",
        city: "any city"
      }
    }

    const event = new CustomerCreatedEvent(eventData);

    eventHandler.handle(event);
    expect(spyeventHandler).toHaveBeenCalledWith(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.street} - ${eventData.address.number} - ${eventData.address.zip}, ${eventData.address.city}`);
  })

});
