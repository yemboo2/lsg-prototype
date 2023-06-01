export interface IActivity {
  name: string;
  priority: number;
}

export interface IUserActivities {
  outer: IActivity[];
  inner: IActivity[];
}
