function stateMsger(msg, state) {
  this.mainState.msg = msg
  this.mainState.class = "msg-" + state
  setTimeout(() => {
    this.mainState.msg = ""
    this.mainState.class = null
  }, 10000)
}

export { stateMsger }
