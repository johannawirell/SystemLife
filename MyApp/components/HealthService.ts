import AppleHealthKit, { HealthKitPermissions, HealthValue } from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
    ],
    write: [],
  },
};

export const initHealth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const getSteps = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getStepCount(
      { startDate: new Date(new Date().setHours(0,0,0,0)).toISOString(), endDate: new Date().toISOString() },
      (err: string, results: HealthValue) => {
        if (err) reject(err);
        else resolve(Number(results.value) || 0);
      }
    );
  });
};

export const getActiveEnergy = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getActiveEnergyBurned(
      { startDate: new Date(new Date().setHours(0,0,0,0)).toISOString(), endDate: new Date().toISOString() },
      (err: string, results: HealthValue[]) => {
        if (err) reject(err);
        else resolve(results.reduce((sum, r) => sum + (Number(r.value) || 0), 0));
      }
    );
  });
};

export const getExerciseMinutes = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getAppleExerciseTime(
      { startDate: new Date(new Date().setHours(0,0,0,0)).toISOString(), endDate: new Date().toISOString() },
      (err: string, results: HealthValue[]) => {
        if (err) reject(err);
        else resolve(results.reduce((sum, r) => sum + (Number(r.value) || 0), 0));
      }
    );
  });
};