import { expect, fixture, html } from '@open-wc/testing';
import '../MeasureElement3';
import Measure from '../../../parser/Measure';

suite('Measure3', () => {
  test('is defined', async () => {
    const el = await fixture(html`
            <chords-grid-measure3></chords-grid-measure3>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal('');
  });

  test('is defined with measure', async () => {
    const el = await fixture(html`
            <chords-grid-measure3 .measure="${new Measure('A B')}"></chords-grid-measure3>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
<table class="grid-measure-3">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-12"><div class="chord"><span class="chord_note">A</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-34"><div class="chord"><span class="chord_note">B</span></div></td>
                </tr>
                </tbody>
            </table>
       `);
  });

  test('is defined with measure and transpose', async () => {
    const el = await fixture(html`
            <chords-grid-measure3 .measure="${new Measure('C D')}" transpose="2"></chords-grid-measure3>`);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
       <table class="grid-measure-3">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-12"><div class="chord"><span class="chord_note">D</span></div></td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-34"><div class="chord"><span class="chord_note">E</span></div></td>
                </tr>
                </tbody>
            </table>
`);
  });
});
