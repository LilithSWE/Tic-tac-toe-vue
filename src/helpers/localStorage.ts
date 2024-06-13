export function editLocalStorage(
  method: string,
  name: string,
  value: string
): void {
  if (method == "set") {
    localStorage.set(name, value);
  } else if (method == "newGame") {
    localStorage.set("x1y1", "");
    localStorage.set("x2y1", "");
    localStorage.set("x3y1", "");

    localStorage.set("x1y2", "");
    localStorage.set("x2y2", "");
    localStorage.set("x3y2", "");

    localStorage.set("x1y3", "");
    localStorage.set("x2y3", "");
    localStorage.set("x3y3", "");
  } else {
    console.log("This method isn't recognized as a valid choice");
  }
}
