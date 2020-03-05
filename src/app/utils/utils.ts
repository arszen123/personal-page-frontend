export default class Utils {
  public static clone (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (typeof obj[attr] === 'object') {
          copy[attr] = this.clone(obj[attr]);
          continue;
        }
        copy[attr] = obj[attr]
      }
    }
    return copy;
  }
  public static unique(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  }
}
