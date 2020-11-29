declare module chrome{

    export class runtime {
        static onMessage:onMessageType
    }

    export class onMessageType {
        addListener(something:any)
    }
}