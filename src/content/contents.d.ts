declare module chrome {
  export class runtime {
    static onMessage: onMessageType;
    static sendMessage(sendData: any, callBack: (response: any) => void);
  }

  export class onMessageType {
    addListener(something: any);
  }

  export type Data = {
    data: any;
  };
}
