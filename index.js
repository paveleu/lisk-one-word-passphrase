import * as cryptography from '@liskhq/lisk-cryptography';
import * as liskPassphrase from '@liskhq/lisk-passphrase';
import * as cliProgress from 'cli-progress';

const { Mnemonic } = liskPassphrase;

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const wordlists = Mnemonic.wordlists.english;

let save = [];

bar.start(wordlists.length - 1, 0);
for (let index = 0; index < wordlists.length; index++) {
    bar.update(index);
    let passphrase = 'xxxxxxxxxxxx';
    passphrase = passphrase.replaceAll('x',wordlists[index] + ' ').trim();
    
    if(Mnemonic.validateMnemonic(passphrase)){
        let address = cryptography.getLisk32AddressFromPassphrase(passphrase);
        save.push({passphrase: passphrase, address: address});
    }      
}
bar.stop();

save.forEach(element => {
    console.log(element.address + ' - ' + element.passphrase);
});