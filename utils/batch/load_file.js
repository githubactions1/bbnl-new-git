const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/sunilmulagada/Downloads/Package\ subscriptions/4_subscriptions_snapshot_Feb_2020\(1\).csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  i=0;
  for await (const line of rl) {
      i++;
      if(i==1){
           console.log(`INSERT INTO mdlwre_snpsht_dtl_s (rcrd_id,mdlwe_sbscr_cd,sbscr_nm,mac_addr_tx,trncn_sts_tx,pckge_nm,trnsn_ts)values`);
           continue;
      }
    // Each line in input.txt will be successively available here as `line`.
    fields=line.split(",");
    if(i%50000==0){
        console.log(";")
        console.log("")
        console.log(`INSERT INTO mdlwre_snpsht_dtl_s (rcrd_id,mdlwe_sbscr_cd,sbscr_nm,mac_addr_tx,trncn_sts_tx,pckge_nm,trnsn_ts)values`)
    }//else { console.log(",")}
    t=fields[4].replace("'"," ")
    if(i==45621)
    console.log(`(${i},'${fields[0]}','${fields[1]}',${fields[2]},'${fields[3]}','${t}','${fields[5]}') `);
  }
}

processLineByLine();