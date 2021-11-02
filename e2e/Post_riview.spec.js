Feature('Post Review');

Scenario('Post review', async ({ I }) => {
  I.pressKey('F5');
  I.amOnPage('/');
  I.wait(2);
  I.seeElement('.btn-card');
  I.click(locate('.btn-card').at(5));
  const review = ['tesdsdssst', 'test'];
  I.seeElement('#inputName', '#inputReview', '#submit');
  I.click('#submit');

  I.see('Note: Name & Review Cant be empty', '.note');

  I.fillField('#inputName', review[0]);
  I.fillField('#inputReview', review[1]);
  I.click('#submit');
  I.see('Comment Has Posted', '.note');
  //   to make sure new data appears
  I.wait(2);
  I.refreshPage();
  I.wait(2);
  I.refreshPage();
  /* untuk berjaga-jaga saat test gagal di karnakan browser tidak mengambil
  data baru dari api saat di refresh */
  // gunakan method pause() untuk menghapus data web browser
  // dan tekan enter untuk melanjutkan test di bawah

  // pause();
  I.see(review[0], locate('.review-name').last());
  I.see(review[1], locate('.review-text').last());
});
