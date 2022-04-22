export default {

throwMoneyFactoryAddress = "0x85841E40736Feb76de69DDA89e05760c4aB54E28";


async function initmetamask(_data){
    document.getElementById("message_box").innerHTML = "配信開始しました！";
    const provider = await ethers.getDefaultProvider("rinkeby", {etherscan: "KAAQMZSEM8PAUDKX7BP26EAEM85A7SG5G6"});
    const useraddress = document.getElementById("wallet_address_input").value;    

    throwMoneyFactoryContract = await new ethers.Contract(throwMoneyFactoryAddress, abi_ThrowMoneyFactory, provider);
    signerPool = await throwMoneyFactoryContract.getPool(useraddress);

    PoolContract = await new ethers.Contract(signerPool, abi_ThrowMoneyPool, provider);
    filter = PoolContract.filters.MoneySent(null, signerPool, null, null, null);
    chat_counter = 0;

    PoolContract.on(filter, (_senderAddr, _reciveAddr, _message, _alias, _amount) => {

	    chatData = {
                alias: _alias,
                amount: _amount,
                message: _message,
	    }
            _data.push(chatData);

	    
	    // Vue を使わない場合の chat_box への要素追加処理
	    //
	    const chatId =  `chat_message_${ chat_counter }`;
	    // 入金額によってスタイルを変更
            //const chatStyleSheet = addStyleFromAmount(_amount, messageId);
	    chat_counter += 1;

	    // #chat_box に追加する div 要素, スマコンからのイベントデータを入れる
	    const chat = document.createElement("div");
	    chat.setAttribute("id", "chat");
	    chat.setAttribute("class", chatId);

	    // ニックネームを入れる div
	    const chat_alias = document.createElement("div");
	    chat_alias.setAttribute("id", "chat_alias");
	    chat_alias.innerHTML = _alias;
	    chat.appendChild(chat_alias);

	    // 入金額を入れる div
	    const chat_amount = document.createElement("div");
	    chat_amount.setAttribute("id", "chat_amount");
	    chat_amount.innerHTML = _amount;
	    chat.appendChild(chat_amount);

	    // メッセージを入れる div
	    const chat_message = document.createElement("div");
	    chat_message.setAttribute("id", "chat_message");
	    chat_message.innerHTML = _message;
	    chat.appendChild(chat_message);

	    document.getElementById("chat_box").appendChild(chat);

	    // デバッグ用ログ
            console.log(`I got ${ ethers.utils.formatEther(_amount) } JPYC from ${ _alias } saying ${ _message }`);
    });
}

}
