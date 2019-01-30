import { Document } from 'mongoose';

import mongodb from '@/bootstrap/mongodb';

const { Schema, model } = mongodb;

export interface IUserModel extends Document {
  telegramId: number;
  config: {
    timerDuration: {
      focus: number;
      shortRest: number;
      longRest: number;
    };
    longRestInterval: number;
    autoStartNext: boolean;
    autoStartRest: boolean;
    sendNotification: {
      startRest: boolean;
      startFocus: boolean;
    };
    stopAfterPeriodCount: Number;
  };
}

const userSchema = new Schema({
  telegramId: {
    type: Number,
    required: true
  },
  config: {
    timerDuration: {
      focus: {
        type: Number,
        default: 25
      },
      shortRest: {
        type: Number,
        default: 5
      },
      longRest: {
        type: Number,
        default: 15
      },
    },
    longRestInterval: {
      type: Number,
      default: 4
    },
    autoStartNext: {
      type: Boolean,
      default: true
    },
    autoStartRest: {
      type: Boolean,
      default: true
    },
    sendNotification: {
      startRest: {
        type: Boolean,
        default: true
      },
      startFocus: {
        type: Boolean,
        default: true
      },
    },
    stopAfterPeriodCount: {
      type: Number,
      default: 0 // Never stop
    }
  }
});

export default model<IUserModel>('User', userSchema);
