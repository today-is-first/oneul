import { createRoot, Root } from "react-dom/client";
import { v4 as uuid } from "uuid";
import { ToastList } from "./ToastList";
import { ToastMessage, ToastType } from "@/types/Toast";

const TOAST_DURATION = 3000;
const MAX_TOAST = 5;

class Toast {
  private static instance: Toast;
  private static root: Root;
  private messages: ToastMessage[] = [];
  private timeoutIds: Record<string, number> = {};

  private constructor() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    Toast.root = createRoot(container);
  }

  static getInstance(): Toast {
    if (!Toast.instance) Toast.instance = new Toast();
    return Toast.instance;
  }

  private render() {
    Toast.root.render(
      <ToastList
        messages={this.messages}
        closeToast={this.closeToast.bind(this)}
      />,
    );
  }

  private autoClose(id: string) {
    this.timeoutIds[id] = window.setTimeout(
      () => this.closeToast(id),
      TOAST_DURATION,
    );
  }

  private closeToast(id: string) {
    clearTimeout(this.timeoutIds[id]);
    delete this.timeoutIds[id];
    this.messages = this.messages.filter((m) => m.id !== id);
    this.render();
  }

  private notify(message: string, type: ToastType) {
    if (this.messages.length >= MAX_TOAST) {
      const oldest = this.messages.shift();
      if (oldest) clearTimeout(this.timeoutIds[oldest.id]);
    }
    const id = uuid();
    this.messages.push({ id, message, type });
    this.render();
    this.autoClose(id);
  }

  success(msg: string) {
    this.notify(msg, "success");
  }
  caution(msg: string) {
    this.notify(msg, "caution");
  }
  error(msg: string) {
    this.notify(msg, "error");
  }
  info(msg: string) {
    this.notify(msg, "info");
  }
}

export default Toast.getInstance();
