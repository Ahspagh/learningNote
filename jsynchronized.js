let locks = {};
let LOCK_TIME_DEFAULT = 100;

export default async function (main, lockName, lockTime) {
  await getLock(lockName, lockTime ? lockTime : LOCK_TIME_DEFAULT);
  let result = await main();
  releaseLock(lockName);
  return result;
}

async function getLock(lockName, lockTime) {
  if (locks[lockName] === undefined) {
    locks[lockName] = true;
  } else {
    if (!locks[lockName]) {
      locks[lockName] = true;
    } else {
      await new Promise(resolve => {
        setTimeout(
          async function () {
            await getLock(lockName, lockTime);
            resolve();
          },
          lockTime ? lockTime : LOCK_TIME_DEFAULT
        );
      });
    }
  }
}

function releaseLock(lockName) {
  locks[lockName] = false;
}
