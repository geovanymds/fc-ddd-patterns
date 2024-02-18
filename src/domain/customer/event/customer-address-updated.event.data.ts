interface CustomerUpdatedAddressEvent {
    street: string;
    number: number;
    zip: string;
    city: string;
}

export default interface CustomerAddressUpdatedEventData {
    id: string;
    name: string;
    address: CustomerUpdatedAddressEvent
}