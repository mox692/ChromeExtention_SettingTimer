
export type messageType = 'checkTimerStatus' | 'chengeTimerStatus' | 'deleteTimer' | 'checkTimerStatus' | 'stopTimer'

export interface TimerStatus{}

export type sendData = {
    messageType :messageType
    onTimer?:boolean
    time?: number
    Stopped_Time?:number
}

export type responseData = {
    TimerStatus?:boolean
    NowTime?:number
    ContentRunning?:boolean
    Stopped_Time?:number
    response?:string
    delete_message? :string
  }

export type responseFn = {
    (data: responseData):void
  }