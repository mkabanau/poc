const broadcast = new BroadcastChannel('channel-123');
broadcast.postMessage({ type: 'MSG_ID', msg: "worker" });
broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'MSG_ID') {
        console.log(event.data.msg)
    }
  };