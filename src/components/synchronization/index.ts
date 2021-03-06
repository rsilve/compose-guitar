import "./SynchronizeConfiguration";
import "./GoogleAPI";
import "./AccountStatus";
import "./SynchronizationStatus";
import { register } from "../../lib/dispatcher";
import { synchronizeCallback } from "./stores/synchronize";

register(synchronizeCallback);
