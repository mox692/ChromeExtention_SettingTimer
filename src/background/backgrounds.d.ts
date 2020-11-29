declare module chrome {
  export class runtime {
    static onMessage: onMessage;
    static sendMessage(sendData: any, callBack: (response: any) => void);
  }

  export class onMessage {
    addListener(something: any);
  }

  export type Data = {
    data: any;
  };
}
