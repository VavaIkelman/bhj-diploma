/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (!response.success) return;

      const accountsList = this.element.querySelector('select');
      accountsList.innerHTML = '';
      response.data.forEach(el => {
        accountsList.innerHTML += ` 
          <option value="${el.id}">${el.name}</option>
        `;  
      })
    })
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (!response.success) return;

      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
      App.update();
    })
  }
}