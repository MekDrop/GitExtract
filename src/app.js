import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";

const app = remote.app;

import './boot/check_statuses.js';
import './boot/inline_alert.js';
import './boot/todo_form.js';
import './boot/progress_bar.js';
